import Link from "next/link";
import { redirect } from "next/navigation";
import AuthMessage from "@/components/AuthMessage";
import BackButton from "@/components/BackButton";
import { signIn } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Sign in | Eyeclimate",
  robots: { index: false, follow: false },
};
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string; next?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/portal");
  const params = await searchParams;
  const inputClass =
    "mt-3 h-14 w-full rounded-lg border border-divider bg-bg-field px-5 text-body outline-none focus:border-border-accent";
  return (
    <section className="site-container pb-14 pt-7 lg:pb-20 lg:pt-8">
      <BackButton href="/" label="Back to website" />
      <div className="mx-auto mt-7 max-w-contact-copy">
        <p className="text-label uppercase tracking-label text-accent-green">
          Editorial portal
        </p>
        <h1 className="mt-3 text-h2-mobile font-normal md:text-h2">
          Welcome back.
        </h1>
        <p className="mt-2 text-body text-text-muted">
          Sign in with an account issued by the Eyeclimate administrator.
        </p>
        <form
          action={signIn}
          className="mt-7 space-y-5 rounded-xl border border-divider bg-bg-card p-6 md:p-8"
        >
          <AuthMessage error={params.error} message={params.message} />
          <input type="hidden" name="next" value={params.next ?? "/portal"} />
          <label className="block">
            <span className="text-label uppercase tracking-label text-text-dim">
              Email
            </span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="text-label uppercase tracking-label text-text-dim">
              Password
            </span>
            <input
              required
              type="password"
              name="password"
              autoComplete="current-password"
              className={inputClass}
            />
          </label>
          <button className="inline-flex h-12 w-full items-center justify-center rounded-full bg-accent-green px-7 text-body-sm font-medium text-text-inverse">
            Enter portal
          </button>
          <div className="text-right text-body-sm text-text-muted">
            <Link href="/forgot-password">Forgot password?</Link>
          </div>
        </form>
      </div>
    </section>
  );
}
