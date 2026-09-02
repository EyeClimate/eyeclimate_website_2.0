"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";

export type Profile = {
  id: string;
  name: string;
  title: string;
  description: string;
  photo_url: string | null;
  linkedin_url: string | null;
  google_scholar_url: string | null;
};

export default function ProfileForm({
  userId,
  email,
  initialProfile,
}: {
  userId: string;
  email: string;
  initialProfile: Profile;
}) {
  const [profile, setProfile] = useState(initialProfile);
  const [photo, setPhoto] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [isPending, startTransition] = useTransition();

  function update(field: keyof Profile, value: string) {
    setProfile((current) => ({ ...current, [field]: value }));
  }

  function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      setStatus("");
      const supabase = createClient();
      let photoUrl = profile.photo_url;

      if (photo) {
        if (
          photo.size > 5 * 1024 * 1024 ||
          !["image/jpeg", "image/png", "image/webp"].includes(photo.type)
        ) {
          setStatus("Use a JPG, PNG, or WebP image smaller than 5 MB.");
          return;
        }
        const extension = photo.name.split(".").pop()?.toLowerCase() || "jpg";
        const path = `${userId}/${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage
          .from("profile-photos")
          .upload(path, photo, { upsert: false });
        if (uploadError) {
          setStatus(uploadError.message);
          return;
        }
        photoUrl = supabase.storage.from("profile-photos").getPublicUrl(path)
          .data.publicUrl;
      }

      const { error } = await supabase.from("profiles").upsert({
        id: userId,
        name: profile.name.trim(),
        title: profile.title.trim(),
        description: profile.description.trim(),
        photo_url: photoUrl,
        linkedin_url: profile.linkedin_url?.trim() || null,
        google_scholar_url: profile.google_scholar_url?.trim() || null,
      });

      if (error) {
        setStatus(error.message);
        return;
      }
      setProfile((current) => ({ ...current, photo_url: photoUrl }));
      setPhoto(null);
      setStatus("Profile saved.");
    });
  }

  const fieldClass =
    "mt-3 h-14 w-full rounded-lg border border-divider bg-bg-field px-5 text-body outline-none focus:border-border-accent";
  return (
    <form
      onSubmit={save}
      className="mt-10 grid gap-8 rounded-xl border border-divider bg-bg-card p-6 md:grid-cols-profile md:p-10"
    >
      <div>
        <div className="relative size-40 overflow-hidden rounded-full border border-divider bg-bg-field">
          {profile.photo_url ? (
            <Image
              src={profile.photo_url}
              alt={profile.name || "Profile photo"}
              fill
              sizes="160px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-h2 text-text-dim">
              {profile.name.slice(0, 1).toUpperCase() || "?"}
            </div>
          )}
        </div>
        <label className="mt-6 block text-body-sm text-text-muted">
          Profile photo
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => setPhoto(event.target.files?.[0] ?? null)}
            className="mt-3 block w-full text-body-xs file:mr-4 file:rounded-full file:border-0 file:bg-accent-green file:px-4 file:py-2 file:text-text-inverse"
          />
        </label>
        <p className="mt-2 text-body-xs text-text-dim">
          JPG, PNG or WebP. Maximum 5 MB.
        </p>
      </div>
      <div className="space-y-6">
        <label className="block">
          <span className="text-label uppercase tracking-label text-text-dim">
            Email
          </span>
          <input
            disabled
            value={email}
            className={`${fieldClass} cursor-not-allowed opacity-60`}
          />
        </label>
        <label className="block">
          <span className="text-label uppercase tracking-label text-text-dim">
            Name
          </span>
          <input
            required
            maxLength={120}
            value={profile.name}
            onChange={(event) => update("name", event.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="text-label uppercase tracking-label text-text-dim">
            Title
          </span>
          <input
            maxLength={160}
            value={profile.title}
            onChange={(event) => update("title", event.target.value)}
            placeholder="Founder & CEO"
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="text-label uppercase tracking-label text-text-dim">
            Description
          </span>
          <textarea
            maxLength={1200}
            value={profile.description}
            onChange={(event) => update("description", event.target.value)}
            rows={6}
            className="mt-3 w-full rounded-lg border border-divider bg-bg-field px-5 py-4 text-body leading-body outline-none focus:border-border-accent"
          />
        </label>
        <label className="block">
          <span className="text-label uppercase tracking-label text-text-dim">
            LinkedIn URL
          </span>
          <input
            type="url"
            value={profile.linkedin_url ?? ""}
            onChange={(event) => update("linkedin_url", event.target.value)}
            placeholder="https://linkedin.com/in/..."
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="text-label uppercase tracking-label text-text-dim">
            Google Scholar URL
          </span>
          <input
            type="url"
            value={profile.google_scholar_url ?? ""}
            onChange={(event) =>
              update("google_scholar_url", event.target.value)
            }
            placeholder="https://scholar.google.com/..."
            className={fieldClass}
          />
        </label>
        {status && (
          <p role="status" className="text-body-sm text-accent-green">
            {status}
          </p>
        )}
        <div className="flex flex-wrap gap-4">
          <button
            disabled={isPending}
            className="inline-flex h-12 items-center rounded-full bg-accent-green px-7 text-body-sm font-medium text-text-inverse disabled:opacity-60"
          >
            {isPending ? "Saving…" : "Save profile"}
          </button>
          <Link
            href={`/profiles/${userId}`}
            className="inline-flex h-12 items-center rounded-full border border-divider px-7 text-body-sm"
          >
            View public profile
          </Link>
        </div>
      </div>
    </form>
  );
}
