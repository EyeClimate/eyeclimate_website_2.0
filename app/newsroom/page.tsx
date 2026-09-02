import type { Metadata } from "next";
import NewsroomClient from "./NewsroomClient";
import { getPublishedArticles } from "@/lib/supabase/articles";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Newsroom | Eyeclimate",
  description:
    "Browse all Eyeclimate news, field reports, product updates, and research.",
};
export default async function NewsroomPage() {
  const published = await getPublishedArticles();
  return <NewsroomClient articles={published} />;
}
