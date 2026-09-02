import { redirect } from "next/navigation";
import AutoDismissAuthMessage from "@/components/AutoDismissAuthMessage";
import BackButton from "@/components/BackButton";
import ProfileForm, { type Profile } from "@/components/ProfileForm";
import { changePassword, signOut } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Your profile | Eyeclimate",
  robots: { index: false, follow: false },
};

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/profile");
  const { data } = await supabase
    .from("profiles")
    .select(
      "id,name,title,description,photo_url,linkedin_url,google_scholar_url",
    )
    .eq("id", user.id)
    .maybeSingle();
  const profile: Profile = data ?? {
    id: user.id,
    name: String(user.user_metadata.name ?? ""),
    title: "",
    description: "",
    photo_url: null,
    linkedin_url: null,
    google_scholar_url: null,
  };
  const params = await searchParams;

  const passwordInputClass =
    "mt-3 h-14 w-full rounded-lg border border-divider bg-bg-field px-5 text-body outline-none focus:border-border-accent";

  return (
    <section className="profile-page site-container pb-14 pt-7 lg:pb-20 lg:pt-8">
      <BackButton href="/portal" label="Back to portal" />
      <div className="mt-7 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-label uppercase tracking-label text-accent-green">
            Account
          </p>
          <h1 className="mt-3 text-h2-mobile font-normal md:text-h2">
            Your profile.
          </h1>
          <p className="mt-2 text-body text-text-muted">
            Update the information displayed on your public profile.
          </p>
        </div>
        <form action={signOut}>
          <button className="inline-flex h-11 items-center rounded-full border border-divider px-6 text-body-sm text-text-muted">
            Sign out
          </button>
        </form>
      </div>
      <ProfileForm
        userId={user.id}
        email={user.email ?? ""}
        initialProfile={profile}
      />
      <section
        id="password"
        className="mt-7 scroll-mt-28 rounded-xl border border-divider bg-bg-card p-6 md:p-8"
      >
        <p className="text-label uppercase tracking-label text-accent-green">
          Security
        </p>
        <h2 className="mt-3 text-h4">Change password</h2>
        <p className="mt-2 text-body-sm text-text-muted">
          Confirm your current password before choosing a new one.
        </p>
        {(params.error || params.message) && (
          <div className="mt-5">
            <AutoDismissAuthMessage
              error={params.error}
              message={params.message}
            />
          </div>
        )}
        <form
          action={changePassword}
          className="mt-6 grid gap-5 md:grid-cols-2"
        >
          <label className="block md:col-span-2">
            <span className="text-label uppercase tracking-label text-text-dim">
              Current password
            </span>
            <input
              required
              type="password"
              name="current_password"
              autoComplete="current-password"
              className={passwordInputClass}
            />
          </label>
          <label className="block">
            <span className="text-label uppercase tracking-label text-text-dim">
              New password
            </span>
            <input
              required
              minLength={8}
              type="password"
              name="new_password"
              autoComplete="new-password"
              className={passwordInputClass}
            />
          </label>
          <label className="block">
            <span className="text-label uppercase tracking-label text-text-dim">
              Confirm new password
            </span>
            <input
              required
              minLength={8}
              type="password"
              name="confirm_password"
              autoComplete="new-password"
              className={passwordInputClass}
            />
          </label>
          <div className="md:col-span-2">
            <button className="inline-flex h-12 items-center justify-center rounded-full bg-accent-green px-7 text-body-sm font-medium text-text-inverse">
              Update password
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}
