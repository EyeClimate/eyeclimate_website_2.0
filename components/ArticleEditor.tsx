"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import ConfirmDeleteButton from "@/components/ConfirmDeleteButton";
import MarkdownRenderer, {
  getMarkdownHeadings,
} from "@/components/MarkdownRenderer";
import { createClient } from "@/lib/supabase/client";
import { deleteArticle } from "@/app/portal/articles/actions";

export type EditableArticle = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  cover_image_url: string | null;
  body_markdown: string;
  status: "draft" | "published" | "archived";
  is_featured: boolean;
  published_at?: string | null;
};

export type ArticleAuthorProfile = {
  name: string;
  title: string;
  description: string;
  photo_url: string | null;
  linkedin_url: string | null;
  google_scholar_url: string | null;
};

const emptyArticle: EditableArticle = {
  title: "",
  slug: "",
  excerpt: "",
  category: "News",
  cover_image_url: null,
  body_markdown: "",
  status: "draft",
  is_featured: false,
  published_at: null,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ArticleEditor({
  userId,
  initialArticle,
  authorProfile,
}: {
  userId: string;
  initialArticle?: EditableArticle;
  authorProfile?: ArticleAuthorProfile | null;
}) {
  const [article, setArticle] = useState(initialArticle ?? emptyArticle);
  const [mode, setMode] = useState<"split" | "editor" | "preview">("split");
  const [status, setStatus] = useState("");
  const [isPending, startTransition] = useTransition();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  function update<K extends keyof EditableArticle>(
    key: K,
    value: EditableArticle[K],
  ) {
    setArticle((current) => ({ ...current, [key]: value }));
  }

  async function uploadImage(file: File) {
    if (
      file.size > 10 * 1024 * 1024 ||
      !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
        file.type,
      )
    )
      throw new Error("Use a JPG, PNG, WebP, or GIF smaller than 10 MB.");
    const supabase = createClient();
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${userId}/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage
      .from("article-images")
      .upload(path, file);
    if (error) throw error;
    return supabase.storage.from("article-images").getPublicUrl(path).data
      .publicUrl;
  }

  async function setCover(file?: File) {
    if (!file) return;
    try {
      setStatus("Uploading cover…");
      update("cover_image_url", await uploadImage(file));
      setStatus("Cover uploaded.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Upload failed.");
    }
  }

  async function insertInlineImage(file?: File) {
    if (!file) return;
    try {
      setStatus("Uploading image…");
      const url = await uploadImage(file);
      const textarea = textareaRef.current;
      const start = textarea?.selectionStart ?? article.body_markdown.length;
      const markdown = `\n![${file.name}](${url})\n`;
      update(
        "body_markdown",
        article.body_markdown.slice(0, start) +
          markdown +
          article.body_markdown.slice(start),
      );
      setStatus("Image inserted.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Upload failed.");
    }
  }

  function save(nextStatus: EditableArticle["status"]) {
    startTransition(async () => {
      setStatus("");
      const title = article.title.trim();
      const slug = slugify(article.slug || article.title);
      if (!title || !slug) {
        setStatus("Title and slug are required.");
        return;
      }
      if (
        nextStatus === "published" &&
        (!article.excerpt.trim() || !article.body_markdown.trim())
      ) {
        setStatus("Add an excerpt and article content before publishing.");
        return;
      }
      const supabase = createClient();
      const payload = {
        author_id: userId,
        title,
        slug,
        excerpt: article.excerpt.trim(),
        category: article.category.trim() || "News",
        cover_image_url: article.cover_image_url,
        body_markdown: article.body_markdown,
        status: nextStatus,
        is_featured: article.is_featured,
        published_at:
          nextStatus === "published"
            ? (article.published_at ?? new Date().toISOString())
            : (article.published_at ?? null),
      };
      const query = article.id
        ? supabase
            .from("articles")
            .update(payload)
            .eq("id", article.id)
            .select("id")
            .single()
        : supabase.from("articles").insert(payload).select("id").single();
      const { data, error } = await query;
      if (error) {
        setStatus(error.message);
        return;
      }
      setArticle((current) => ({
        ...current,
        id: data.id,
        slug,
        status: nextStatus,
        published_at: payload.published_at,
      }));
      setStatus(
        nextStatus === "published"
          ? "Article published."
          : nextStatus === "archived"
            ? "Article archived."
            : "Draft saved.",
      );
      if (!article.id) router.replace(`/portal/articles/${data.id}/edit`);
      router.refresh();
    });
  }

  const field =
    "h-11 w-full rounded-lg border border-divider bg-bg-field px-4 text-body-sm outline-none focus:border-border-accent";
  const showEditor = mode !== "preview";
  const showPreview = mode !== "editor";
  const previewContent =
    article.body_markdown || "Start writing to see the live preview.";
  const previewHeadings = getMarkdownHeadings(article.body_markdown);
  const previewReadTime = Math.max(
    1,
    Math.ceil(article.body_markdown.split(/\s+/).filter(Boolean).length / 200),
  );
  const previewDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Preview";
  const authorName = authorProfile?.name || "Eyeclimate team";
  const authorTitle = authorProfile?.title || "Research & product team";

  return (
    <section className="site-container pb-10 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <BackButton href="/portal/articles" label="Back to articles" />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setMode("editor")}
            className={`rounded-full border px-4 py-2 text-body-xs ${mode === "editor" ? "border-border-accent text-accent-green" : "border-divider text-text-muted"}`}
          >
            Editor fullscreen
          </button>
          <button
            onClick={() => setMode("split")}
            className={`rounded-full border px-4 py-2 text-body-xs ${mode === "split" ? "border-border-accent text-accent-green" : "border-divider text-text-muted"}`}
          >
            Split view
          </button>
          <button
            onClick={() => setMode("preview")}
            className={`rounded-full border px-4 py-2 text-body-xs ${mode === "preview" ? "border-border-accent text-accent-green" : "border-divider text-text-muted"}`}
          >
            Preview fullscreen
          </button>
        </div>
      </div>
      <div
        className={`mt-6 grid gap-5 ${
          mode === "split" ? "lg:grid-cols-article-editor" : "grid-cols-1"
        }`}
      >
        {showEditor && (
          <div className="min-w-0 rounded-xl border border-divider bg-bg-card p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="text-label uppercase tracking-label text-text-dim">
                  Title
                </span>
                <input
                  value={article.title}
                  onChange={(e) => {
                    update("title", e.target.value);
                    if (!article.id && !article.slug)
                      update("slug", slugify(e.target.value));
                  }}
                  className={`mt-2 ${field}`}
                />
              </label>
              <label>
                <span className="text-label uppercase tracking-label text-text-dim">
                  Slug
                </span>
                <input
                  value={article.slug}
                  onChange={(e) => update("slug", slugify(e.target.value))}
                  className={`mt-2 ${field}`}
                />
              </label>
              <label>
                <span className="text-label uppercase tracking-label text-text-dim">
                  Category
                </span>
                <input
                  value={article.category}
                  onChange={(e) => update("category", e.target.value)}
                  className={`mt-2 ${field}`}
                />
              </label>
              <label className="flex items-center gap-3 rounded-lg border border-divider bg-bg-field px-4 py-3 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={article.is_featured}
                  onChange={(event) =>
                    update("is_featured", event.target.checked)
                  }
                  className="size-4 accent-accent-green"
                />
                <span>
                  <span className="block text-body-sm text-text-primary">
                    Feature this article
                  </span>
                  <span className="mt-1 block text-body-xs text-text-dim">
                    When published, it can appear in the large featured section
                    on the News page.
                  </span>
                </span>
              </label>
              <label className="sm:col-span-2">
                <span className="text-label uppercase tracking-label text-text-dim">
                  Excerpt
                </span>
                <textarea
                  value={article.excerpt}
                  onChange={(e) => update("excerpt", e.target.value)}
                  rows={3}
                  className="mt-2 w-full rounded-lg border border-divider bg-bg-field px-4 py-3 text-body-sm outline-none focus:border-border-accent"
                />
              </label>
              <label className="sm:col-span-2">
                <span className="text-label uppercase tracking-label text-text-dim">
                  Cover image
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(e) => setCover(e.target.files?.[0])}
                  className="mt-2 block w-full text-body-xs file:mr-4 file:rounded-full file:border-0 file:bg-accent-green file:px-4 file:py-2 file:text-text-inverse"
                />
              </label>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2 border-y border-divider py-3">
              <button
                type="button"
                onClick={() =>
                  update(
                    "body_markdown",
                    `${article.body_markdown}\n## Heading\n`,
                  )
                }
                className="rounded border border-divider px-3 py-2 text-body-xs"
              >
                Heading
              </button>
              <button
                type="button"
                onClick={() =>
                  update(
                    "body_markdown",
                    `${article.body_markdown}**bold text**`,
                  )
                }
                className="rounded border border-divider px-3 py-2 text-body-xs"
              >
                Bold
              </button>
              <button
                type="button"
                onClick={() =>
                  update(
                    "body_markdown",
                    `${article.body_markdown}\n- List item\n`,
                  )
                }
                className="rounded border border-divider px-3 py-2 text-body-xs"
              >
                List
              </button>
              <button
                type="button"
                onClick={() =>
                  update(
                    "body_markdown",
                    `${article.body_markdown}\n| Metric | Value | Notes |\n| --- | ---: | --- |\n| Example | 100 | Add context |\n| Example | 200 | Add context |\n`,
                  )
                }
                className="rounded border border-divider px-3 py-2 text-body-xs"
              >
                Table
              </button>
              <label className="cursor-pointer rounded border border-divider px-3 py-2 text-body-xs">
                Insert image
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(e) => insertInlineImage(e.target.files?.[0])}
                  className="hidden"
                />
              </label>
            </div>
            <textarea
              ref={textareaRef}
              value={article.body_markdown}
              onChange={(e) => update("body_markdown", e.target.value)}
              placeholder="# Start writing your article…"
              className="mt-4 min-h-article-editor w-full resize-y rounded-lg border border-divider bg-bg-field p-5 font-mono text-body-sm leading-body outline-none focus:border-border-accent"
            />
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                disabled={isPending}
                onClick={() => save("draft")}
                className="rounded-full border border-divider px-5 py-3 text-body-sm"
              >
                Save draft
              </button>
              <button
                disabled={isPending}
                onClick={() => save("published")}
                className="rounded-full bg-accent-green px-5 py-3 text-body-sm font-medium text-text-inverse"
              >
                Publish
              </button>
              {article.id && (
                <button
                  disabled={isPending}
                  onClick={() => save("archived")}
                  className="rounded-full border border-divider px-5 py-3 text-body-sm text-text-muted"
                >
                  Archive
                </button>
              )}
              {article.id ? (
                <ConfirmDeleteButton
                  action={deleteArticle}
                  resourceId={article.id}
                  resourceName={article.title || "Untitled article"}
                />
              ) : null}
              <span className="text-body-xs text-text-muted">
                {isPending ? "Saving…" : status}
              </span>
            </div>
          </div>
        )}
        {showPreview && (
          <article className="min-w-0 overflow-hidden rounded-xl border border-divider bg-bg-page">
            <div className="border-b border-divider px-6 py-4 text-label uppercase tracking-label text-text-dim">
              Live preview
            </div>
            <header className="px-6 py-10 md:px-8 md:py-12">
              <div className="flex flex-wrap items-center gap-3 text-tiny">
                <span className="rounded-full border border-border-accent px-3 py-1 uppercase tracking-caption text-accent-green">
                  {article.category || "News"}
                </span>
                <span className="text-text-dim">
                  {previewDate} · {previewReadTime} min read
                </span>
              </div>
              <h1 className="mt-5 text-case-mobile font-normal leading-hero tracking-display md:text-case-desktop">
                {article.title || "Untitled article"}
              </h1>
              {article.excerpt && (
                <p className="mt-5 max-w-case-intro text-body-lg leading-body text-text-muted">
                  {article.excerpt}
                </p>
              )}
              <div className="mt-7 flex items-center justify-between border-b border-divider pb-6">
                <div className="flex items-center gap-4">
                  {authorProfile?.photo_url && (
                    <div className="relative size-11 overflow-hidden rounded-full">
                      <Image
                        src={authorProfile.photo_url}
                        alt={authorName}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-body-sm">{authorName}</p>
                    <p className="text-body-xs text-text-dim">{authorTitle}</p>
                  </div>
                </div>
                <span className="text-body-xs text-text-dim">
                  {article.status}
                </span>
              </div>
            </header>
            {article.cover_image_url && (
              <div className="px-6 md:px-8">
                <Image
                  src={article.cover_image_url}
                  alt="Cover preview"
                  width={1200}
                  height={675}
                  className="aspect-video h-auto w-full rounded-xl border border-divider object-cover"
                />
              </div>
            )}
            <div
              className={`grid gap-12 px-6 py-12 md:px-8 md:py-16 ${
                mode === "preview" ? "lg:grid-cols-article" : ""
              }`}
            >
              {mode === "preview" && (
                <aside className="hidden lg:block">
                  <nav
                    aria-label="In this article preview"
                    className="sticky top-28 space-y-3 text-body-xs text-text-dim"
                  >
                    <p className="uppercase tracking-label">In this article</p>
                    {previewHeadings.length ? (
                      previewHeadings.map((heading) => (
                        <a
                          key={heading.id}
                          href={`#${heading.id}`}
                          className="block transition-colors hover:text-text-primary"
                        >
                          {heading.text}
                        </a>
                      ))
                    ) : (
                      <p className="leading-body">
                        Add ## headings to create navigation.
                      </p>
                    )}
                  </nav>
                </aside>
              )}
              <div className="min-w-0">
                <MarkdownRenderer content={previewContent} />
              </div>
            </div>
            <section className="border-y border-divider">
              <div className="px-6 py-10 md:px-8">
                <div className="flex max-w-author gap-5">
                  {authorProfile?.photo_url && (
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={authorProfile.photo_url}
                        alt={authorName}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-label uppercase tracking-label text-text-dim">
                      Written by
                    </p>
                    <h2 className="mt-2 text-body-lg font-medium">
                      {authorName}
                    </h2>
                    <p className="mt-1 text-body-sm text-accent-green">
                      {authorTitle}
                    </p>
                    {authorProfile?.description && (
                      <p className="mt-3 text-body-sm leading-body text-text-muted">
                        {authorProfile.description}
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-5 text-body-xs text-text-muted">
                      <span>More articles</span>
                      {authorProfile?.linkedin_url && <span>LinkedIn</span>}
                      {authorProfile?.google_scholar_url && (
                        <span>Google Scholar</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </article>
        )}
      </div>
    </section>
  );
}
