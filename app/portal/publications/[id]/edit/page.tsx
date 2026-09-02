import { notFound, redirect } from "next/navigation";
import BackButton from "@/components/BackButton";
import PublicationForm from "@/components/PublicationForm";
import type { Publication } from "@/lib/supabase/publications";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Edit publication | Eyeclimate" };

export default async function EditPublicationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=/portal/publications/${id}/edit`);
  const { data } = await supabase
    .from("publications")
    .select(
      "id,title,publication_date,venue,highlights,tags,publication_url,citation_count,status,is_selected",
    )
    .eq("id", id)
    .eq("owner_id", user.id)
    .maybeSingle();
  if (!data) notFound();
  const query = await searchParams;
  return (
    <section className="site-container pb-14 pt-7 lg:pb-20 lg:pt-8">
      <BackButton href="/portal/publications" label="Back to publications" />
      <div className="mt-7">
        <p className="text-label uppercase tracking-label text-accent-green">
          Research
        </p>
        <h1 className="mt-3 text-h2-mobile font-normal md:text-h2">
          Edit publication.
        </h1>
      </div>
      <PublicationForm
        publication={data as Publication}
        error={query.error}
        message={query.message}
      />
    </section>
  );
}
