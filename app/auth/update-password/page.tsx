import AuthMessage from "@/components/AuthMessage";
import BackButton from "@/components/BackButton";
import { updatePassword } from "@/app/auth/actions";

export const metadata = {
  title: "Choose a new password | Eyeclimate",
  robots: { index: false, follow: false },
};
export default async function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <section className="site-container pb-14 pt-7 lg:pb-20 lg:pt-8">
      <BackButton href="/login" label="Back to sign in" />
      <div className="mx-auto mt-7 max-w-contact-copy">
        <h1 className="text-h2-mobile font-normal md:text-h2">
          Choose a new password.
        </h1>
        <form
          action={updatePassword}
          className="mt-7 space-y-5 rounded-xl border border-divider bg-bg-card p-6 md:p-8"
        >
          <AuthMessage error={params.error} />
          <label className="block">
            <span className="text-label uppercase tracking-label text-text-dim">
              New password
            </span>
            <input
              required
              minLength={8}
              type="password"
              name="password"
              autoComplete="new-password"
              className="mt-3 h-14 w-full rounded-lg border border-divider bg-bg-field px-5 text-body outline-none focus:border-border-accent"
            />
          </label>
          <button className="inline-flex h-12 w-full items-center justify-center rounded-full bg-accent-green px-7 text-body-sm font-medium text-text-inverse">
            Update password
          </button>
        </form>
      </div>
    </section>
  );
}
