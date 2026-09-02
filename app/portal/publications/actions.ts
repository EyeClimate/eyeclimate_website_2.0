"use server";

import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function resultLocation(
  key: "error" | "message",
  message: string,
  id?: string,
) {
  const path = id
    ? `/portal/publications/${id}/edit`
    : "/portal/publications/new";
  return `${path}?${key}=${encodeURIComponent(message)}`;
}

function isPrivateAddress(address: string) {
  if (address === "::1" || address === "0:0:0:0:0:0:0:1") return true;
  if (
    address.startsWith("fc") ||
    address.startsWith("fd") ||
    address.startsWith("fe80:")
  )
    return true;
  if (!isIP(address)) return false;
  const parts = address.split(".").map(Number);
  return (
    parts[0] === 10 ||
    parts[0] === 127 ||
    parts[0] === 0 ||
    (parts[0] === 169 && parts[1] === 254) ||
    (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
    (parts[0] === 192 && parts[1] === 168)
  );
}

async function assertPublicUrl(rawUrl: string) {
  let current = new URL(rawUrl);
  for (let redirectCount = 0; redirectCount < 5; redirectCount += 1) {
    if (!["http:", "https:"].includes(current.protocol))
      throw new Error("Use a public HTTP or HTTPS publication URL.");
    if (current.username || current.password)
      throw new Error("Publication URLs cannot contain credentials.");
    const hostname = current.hostname.toLowerCase();
    if (hostname === "localhost" || hostname.endsWith(".local"))
      throw new Error("Use a public publication URL.");
    const addresses = await lookup(hostname, { all: true });
    if (
      !addresses.length ||
      addresses.some(({ address }) => isPrivateAddress(address))
    )
      throw new Error("Use a public publication URL.");

    const response = await fetch(current, {
      method: "HEAD",
      redirect: "manual",
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "Eyeclimate publication link validator" },
    });
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location)
        throw new Error("The publication URL redirects incorrectly.");
      current = new URL(location, current);
      continue;
    }
    if (response.status >= 200 && response.status < 300)
      return current.toString();
    throw new Error(
      `The publication URL could not be opened (HTTP ${response.status}).`,
    );
  }
  throw new Error("The publication URL has too many redirects.");
}

export async function savePublication(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/portal/publications");

  const id = value(formData, "id") || undefined;
  const title = value(formData, "title");
  const publicationDate = value(formData, "publication_date");
  const rawUrl = value(formData, "publication_url");
  if (!title || !publicationDate || !rawUrl)
    redirect(
      resultLocation(
        "error",
        "Title, publication date, and link are required.",
        id,
      ),
    );

  let publicationUrl: string;
  try {
    publicationUrl = await assertPublicUrl(rawUrl);
  } catch (error) {
    redirect(
      resultLocation(
        "error",
        error instanceof Error
          ? error.message
          : "The publication URL is invalid.",
        id,
      ),
    );
  }

  const status = value(formData, "status");
  const payload = {
    owner_id: user.id,
    title,
    publication_date: publicationDate,
    venue: value(formData, "venue"),
    highlights: value(formData, "highlights"),
    tags: value(formData, "tags")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    publication_url: publicationUrl,
    citation_count: Math.max(
      0,
      Number.parseInt(value(formData, "citation_count") || "0", 10) || 0,
    ),
    status: ["draft", "published", "archived"].includes(status)
      ? status
      : "draft",
    is_selected: formData.get("is_selected") === "on",
  };

  const query = id
    ? supabase
        .from("publications")
        .update(payload)
        .eq("id", id)
        .eq("owner_id", user.id)
        .select("id")
        .single()
    : supabase.from("publications").insert(payload).select("id").single();
  const { data, error } = await query;
  if (error) redirect(resultLocation("error", error.message, id));
  revalidatePath("/");
  revalidatePath("/about");
  redirect(
    resultLocation("message", "Publication saved and link validated.", data.id),
  );
}

export async function deletePublication(formData: FormData) {
  const id = value(formData, "id");
  if (!id) redirect("/portal/publications");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/portal/publications");

  const { error } = await supabase
    .from("publications")
    .delete()
    .eq("id", id)
    .eq("owner_id", user.id);
  if (error)
    redirect(`/portal/publications?error=${encodeURIComponent(error.message)}`);

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/portal/publications");
  redirect("/portal/publications?message=Publication%20deleted.");
}
