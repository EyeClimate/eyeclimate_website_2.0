import Image from "next/image";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import { createClient } from "@/lib/supabase/server";

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "id,name,title,description,photo_url,linkedin_url,google_scholar_url",
    )
    .eq("id", id)
    .maybeSingle();
  if (!profile) notFound();
  return (
    <section className="site-container pb-14 pt-7 lg:pb-20 lg:pt-8">
      <BackButton href="/portal" label="Back to portal" />
      <article className="mx-auto mt-7 grid max-w-article gap-7 rounded-xl border border-divider bg-bg-card p-6 md:grid-cols-profile md:p-8">
        <div className="relative size-40 overflow-hidden rounded-full border border-divider bg-bg-field">
          {profile.photo_url ? (
            <Image
              src={profile.photo_url}
              alt={profile.name}
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
        <div>
          <p className="text-label uppercase tracking-label text-accent-green">
            Eyeclimate profile
          </p>
          <h1 className="mt-4 text-h2-mobile font-normal md:text-h2">
            {profile.name}
          </h1>
          {profile.title && (
            <p className="mt-2 text-h5 text-text-muted">{profile.title}</p>
          )}
          {profile.description && (
            <p className="mt-5 max-w-case-intro whitespace-pre-line text-body leading-body text-text-muted">
              {profile.description}
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-4">
            {profile.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-divider px-6 py-3 text-body-sm"
              >
                LinkedIn ↗
              </a>
            )}
            {profile.google_scholar_url && (
              <a
                href={profile.google_scholar_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-divider px-6 py-3 text-body-sm"
              >
                Google Scholar ↗
              </a>
            )}
          </div>
        </div>
      </article>
    </section>
  );
}
