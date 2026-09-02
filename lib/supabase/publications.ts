import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";

export type Publication = {
  id: string;
  title: string;
  publication_date: string;
  venue: string;
  highlights: string;
  tags: string[];
  publication_url: string;
  citation_count: number;
  status: "draft" | "published" | "archived";
  is_selected: boolean;
};

export const getPublishedPublications = cache(
  async (): Promise<Publication[]> => {
    const supabase = createPublicClient();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from("publications")
      .select(
        "id,title,publication_date,venue,highlights,tags,publication_url,citation_count,status,is_selected",
      )
      .eq("status", "published")
      .order("publication_date", { ascending: false });
    if (error) {
      console.error("Unable to load publications:", error.message);
      return [];
    }
    return (data ?? []) as Publication[];
  },
);
