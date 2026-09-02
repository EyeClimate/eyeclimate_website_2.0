import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  organization?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

async function sendGoogleFormsCopy(data: {
  name: string;
  organization: string;
  email: string;
  message: string;
}) {
  const action = process.env.NEXT_PUBLIC_GOOGLE_FORM_ACTION;
  const nameKey = process.env.NEXT_PUBLIC_GOOGLE_FORM_NAME_ENTRY;
  const organizationKey =
    process.env.NEXT_PUBLIC_GOOGLE_FORM_ORGANIZATION_ENTRY;
  const emailKey = process.env.NEXT_PUBLIC_GOOGLE_FORM_EMAIL_ENTRY;
  const messageKey = process.env.NEXT_PUBLIC_GOOGLE_FORM_MESSAGE_ENTRY;
  if (!action || !nameKey || !organizationKey || !emailKey || !messageKey)
    return;

  const form = new URLSearchParams({
    [nameKey]: data.name,
    [organizationKey]: data.organization,
    [emailKey]: data.email,
    [messageKey]: data.message,
  });
  await fetch(action, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form,
    signal: AbortSignal.timeout(5000),
  });
}

async function sendSlackNotification(data: {
  name: string;
  organization: string;
  email: string;
  message: string;
}) {
  const webhookUrl = process.env.SLACK_CONTACT_WEBHOOK_URL;
  if (!webhookUrl) throw new Error("Slack webhook is not configured.");
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `New website inquiry from ${data.name} (${data.organization})`,
      blocks: [
        {
          type: "header",
          text: { type: "plain_text", text: "New website inquiry" },
        },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*Name*\n${data.name}` },
            { type: "mrkdwn", text: `*Organization*\n${data.organization}` },
            { type: "mrkdwn", text: `*Email*\n${data.email}` },
          ],
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Message*\n${data.message || "No additional information provided."}`,
          },
        },
      ],
    }),
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`Slack returned ${response.status}.`);
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host)
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403 },
    );

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const data = {
    name: clean(body.name, 120),
    organization: clean(body.organization, 160),
    email: clean(body.email, 320).toLowerCase(),
    message: clean(body.message, 5000),
  };
  if (!data.name || !data.organization || !/^\S+@\S+\.\S+$/.test(data.email))
    return NextResponse.json(
      { error: "Please provide your name, organization, and a valid email." },
      { status: 400 },
    );

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serverSecretKey =
    process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serverSecretKey) {
    console.error("Contact form database credentials are not configured.");
    return NextResponse.json(
      { error: "The contact form is temporarily unavailable." },
      { status: 503 },
    );
  }

  const supabase = createClient(supabaseUrl, serverSecretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: inquiry, error } = await supabase
    .from("contact_inquiries")
    .insert(data)
    .select("id")
    .single();
  if (error) {
    console.error("Contact inquiry insert failed:", error.message);
    return NextResponse.json(
      { error: "We could not send your message. Please try again." },
      { status: 500 },
    );
  }

  const [slackResult] = await Promise.allSettled([
    sendSlackNotification(data),
    sendGoogleFormsCopy(data),
  ]);
  if (slackResult.status === "fulfilled") {
    await supabase
      .from("contact_inquiries")
      .update({ slack_notified_at: new Date().toISOString() })
      .eq("id", inquiry.id);
  } else {
    console.error("Slack contact notification failed:", slackResult.reason);
  }

  return NextResponse.json({ ok: true });
}
