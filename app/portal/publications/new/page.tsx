import { redirect } from "next/navigation";
import BackButton from "@/components/BackButton";
import PublicationForm from "@/components/PublicationForm";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "New publication | Eyeclimate" };

export default async function NewPublicationPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/portal/publications/new");
  const params = await searchParams;
  return (
    <section className="site-container pb-14 pt-7 lg:pb-20 lg:pt-8">
      <BackButton href="/portal/publications" label="Back to publications" />
      <div className="mt-7">
        <p className="text-label uppercase tracking-label text-accent-green">
          Research
        </p>
        <h1 className="mt-3 text-h2-mobile font-normal md:text-h2">
          Add publication.
        </h1>
      </div>
      <PublicationForm error={params.error} message={params.message} />
    </section>
  );
}
