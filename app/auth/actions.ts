"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}
function destination(path: string, key: "error" | "message", message: string) {
  return `${path}?${key}=${encodeURIComponent(message)}`;
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const next = value(formData, "next") || "/portal";
  const { error } = await supabase.auth.signInWithPassword({
    email: value(formData, "email"),
    password: value(formData, "password"),
  });
  if (error) redirect(destination("/login", "error", error.message));
  redirect(next.startsWith("/") ? next : "/portal");
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  const origin = (await headers()).get("origin") ?? "http://localhost:3000";
  const password = value(formData, "password");
  if (password.length < 8)
    redirect(
      destination(
        "/signup",
        "error",
        "Password must contain at least 8 characters.",
      ),
    );
  const { error } = await supabase.auth.signUp({
    email: value(formData, "email"),
    password,
    options: {
      data: { name: value(formData, "name") },
      emailRedirectTo: `${origin}/auth/callback?next=/profile`,
    },
  });
  if (error) redirect(destination("/signup", "error", error.message));
  redirect(
    destination(
      "/login",
      "message",
      "Check your email to confirm your account.",
    ),
  );
}

export async function requestPasswordReset(formData: FormData) {
  const supabase = await createClient();
  const origin = (await headers()).get("origin") ?? "http://localhost:3000";
  const { error } = await supabase.auth.resetPasswordForEmail(
    value(formData, "email"),
    { redirectTo: `${origin}/auth/callback?next=/auth/update-password` },
  );
  if (error) redirect(destination("/forgot-password", "error", error.message));
  redirect(
    destination(
      "/login",
      "message",
      "If that account exists, a reset link has been sent.",
    ),
  );
}

export async function updatePassword(formData: FormData) {
  const password = value(formData, "password");
  if (password.length < 8)
    redirect(
      destination(
        "/auth/update-password",
        "error",
        "Password must contain at least 8 characters.",
      ),
    );
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error)
    redirect(destination("/auth/update-password", "error", error.message));
  redirect(destination("/profile", "message", "Password updated."));
}

export async function changePassword(formData: FormData) {
  const currentPassword = value(formData, "current_password");
  const newPassword = value(formData, "new_password");
  const confirmPassword = value(formData, "confirm_password");
  const passwordDestination = (key: "error" | "message", message: string) =>
    `${destination("/profile", key, message)}#password`;

  if (newPassword.length < 8)
    redirect(
      passwordDestination(
        "error",
        "The new password must contain at least 8 characters.",
      ),
    );
  if (newPassword !== confirmPassword)
    redirect(passwordDestination("error", "The new passwords do not match."));
  if (currentPassword === newPassword)
    redirect(
      passwordDestination(
        "error",
        "Choose a new password that differs from your current password.",
      ),
    );

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) redirect("/login?next=/profile");

  const { error: verificationError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });
  if (verificationError)
    redirect(
      passwordDestination("error", "The current password is incorrect."),
    );

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) redirect(passwordDestination("error", error.message));
  redirect(passwordDestination("message", "Password updated successfully."));
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
