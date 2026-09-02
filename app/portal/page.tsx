import Link from "next/link";
import { redirect } from "next/navigation";
import BackButton from "@/components/BackButton";
import { signOut } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Editorial portal | Eyeclimate" };

export default async function PortalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/portal");

  return (
    <section className="site-container pb-14 pt-7 lg:pb-20 lg:pt-8">
      <BackButton href="/" label="Back to website" />
      <div className="mt-7 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-label uppercase tracking-label text-accent-green">
            Private workspace
          </p>
          <h1 className="mt-3 text-h2-mobile font-normal md:text-h2">
            Editorial portal.
          </h1>
          <p className="mt-2 text-body text-text-muted">
            Signed in as {user.email}
          </p>
        </div>
        <form action={signOut}>
          <button className="inline-flex h-11 items-center rounded-full border border-divider px-6 text-body-sm text-text-muted">
            Sign out
          </button>
        </form>
      </div>
      <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-xl border border-divider bg-bg-card p-6 md:p-7">
          <p className="text-label uppercase tracking-label text-accent-green">
            Publishing
          </p>
          <h2 className="mt-4 text-h4">News articles</h2>
          <p className="mt-3 text-body-sm leading-body text-text-muted">
            Create articles in Markdown, upload images, preview changes live,
            then publish or archive them.
          </p>
          <Link
            href="/portal/articles"
            className="mt-5 inline-flex rounded-full bg-accent-green px-5 py-3 text-body-sm font-medium text-text-inverse"
          >
            Manage articles →
          </Link>
        </article>
        <article className="rounded-xl border border-divider bg-bg-card p-6 md:p-7">
          <p className="text-label uppercase tracking-label text-accent-green">
            Research
          </p>
          <h2 className="mt-4 text-h4">Papers &amp; publications</h2>
          <p className="mt-3 text-body-sm leading-body text-text-muted">
            Add publication metadata, validate links, and choose which papers
            appear on the homepage.
          </p>
          <Link
            href="/portal/publications"
            className="mt-5 inline-flex rounded-full bg-accent-green px-5 py-3 text-body-sm font-medium text-text-inverse"
          >
            Manage publications →
          </Link>
        </article>
        <article className="rounded-xl border border-divider bg-bg-card p-6 md:p-7">
          <p className="text-label uppercase tracking-label text-accent-green">
            Account
          </p>
          <h2 className="mt-4 text-h4">Author profile</h2>
          <p className="mt-3 text-body-sm leading-body text-text-muted">
            Manage the name, title, biography, photo, LinkedIn and Google
            Scholar details displayed with your articles.
          </p>
          <Link
            href="/profile"
            className="mt-5 inline-flex rounded-full bg-accent-green px-5 py-3 text-body-sm font-medium text-text-inverse"
          >
            Edit profile →
          </Link>
        </article>
      </div>
    </section>
  );
}
