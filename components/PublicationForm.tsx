import AuthMessage from "@/components/AuthMessage";
import ConfirmDeleteButton from "@/components/ConfirmDeleteButton";
import type { Publication } from "@/lib/supabase/publications";
import {
  deletePublication,
  savePublication,
} from "@/app/portal/publications/actions";

const inputClass =
  "mt-3 h-14 w-full rounded-lg border border-divider bg-bg-field px-5 text-body outline-none focus:border-border-accent";

export default function PublicationForm({
  publication,
  error,
  message,
}: {
  publication?: Publication;
  error?: string;
  message?: string;
}) {
  return (
    <form
      action={savePublication}
      className="mt-7 space-y-6 rounded-xl border border-divider bg-bg-card p-6 md:p-8"
    >
      <AuthMessage error={error} message={message} />
      <input type="hidden" name="id" value={publication?.id ?? ""} />
      <label className="block">
        <span className="text-label uppercase tracking-label text-text-dim">
          Paper or publication name *
        </span>
        <input
          required
          name="title"
          defaultValue={publication?.title}
          className={inputClass}
        />
      </label>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-label uppercase tracking-label text-text-dim">
            Publication date *
          </span>
          <input
            required
            type="date"
            name="publication_date"
            defaultValue={publication?.publication_date}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="text-label uppercase tracking-label text-text-dim">
            Venue / journal
          </span>
          <input
            name="venue"
            defaultValue={publication?.venue}
            placeholder="CVPR, WACV, Nature…"
            className={inputClass}
          />
        </label>
      </div>
      <label className="block">
        <span className="text-label uppercase tracking-label text-text-dim">
          Tags
        </span>
        <input
          name="tags"
          defaultValue={publication?.tags.join(", ")}
          placeholder="Hyperspectral, methane, highlight paper"
          className={inputClass}
        />
        <span className="mt-2 block text-body-xs text-text-dim">
          Separate tags with commas.
        </span>
      </label>
      <label className="block">
        <span className="text-label uppercase tracking-label text-text-dim">
          Highlights
        </span>
        <textarea
          name="highlights"
          defaultValue={publication?.highlights}
          rows={3}
          placeholder="Field validation study · 426-band AVIRIS-NG validation"
          className="mt-3 w-full rounded-lg border border-divider bg-bg-field px-5 py-4 text-body outline-none focus:border-border-accent"
        />
      </label>
      <div className="grid gap-5 md:grid-cols-[1fr_12rem]">
        <label className="block">
          <span className="text-label uppercase tracking-label text-text-dim">
            Actual publication link *
          </span>
          <input
            required
            type="url"
            name="publication_url"
            defaultValue={publication?.publication_url}
            placeholder="https://doi.org/…"
            className={inputClass}
          />
          <span className="mt-2 block text-body-xs text-text-dim">
            The server checks that this public URL opens before saving.
          </span>
        </label>
        <label className="block">
          <span className="text-label uppercase tracking-label text-text-dim">
            Citations
          </span>
          <input
            min={0}
            type="number"
            name="citation_count"
            defaultValue={publication?.citation_count ?? 0}
            className={inputClass}
          />
        </label>
      </div>
      <div className="grid gap-5 md:grid-cols-2 md:items-end">
        <label className="block">
          <span className="text-label uppercase tracking-label text-text-dim">
            Status
          </span>
          <select
            name="status"
            defaultValue={publication?.status ?? "draft"}
            className={inputClass}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </label>
        <label className="flex h-14 items-center gap-3 rounded-lg border border-divider bg-bg-field px-5">
          <input
            type="checkbox"
            name="is_selected"
            defaultChecked={publication?.is_selected}
            className="size-4 accent-accent-green"
          />
          <span className="text-body-sm">
            Show in selected publications on the homepage
          </span>
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button className="inline-flex h-12 items-center rounded-full bg-accent-green px-7 text-body-sm font-medium text-text-inverse">
          Validate link &amp; save publication
        </button>
        {publication ? (
          <ConfirmDeleteButton
            action={deletePublication}
            resourceId={publication.id}
            resourceName={publication.title}
          />
        ) : null}
      </div>
    </form>
  );
}
