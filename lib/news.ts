export type NewsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  featured?: boolean;
  author: string;
  readTime: string;
};

export const articles: NewsArticle[] = [
  {
    slug: "wildlifemapper-maasai-mara-survey",
    title: "WildlifeMapper completes large-scale survey in the Maasai Mara.",
    excerpt:
      "Our cross-platform AI model identified more than 30,000 individual animals across a 200 km² survey area — the largest WildlifeMapper deployment to date.",
    category: "Field report",
    date: "May 4, 2026",
    image: "/figma/news/hero-birds.webp",
    featured: true,
    author: "Satish Kumar",
    readTime: "8 min read",
  },
  {
    slug: "air-quality-intelligence-new-delhi",
    title: "Eyeclimate expands air quality intelligence pilot in New Delhi",
    excerpt:
      "A cross-platform AI system mapping pollution sources in real time.",
    category: "Product",
    date: "April 22, 2026",
    image: "/figma/news/card-2-heatmap.webp",
    author: "Victor Sheperd",
    readTime: "6 min read",
  },
  {
    slug: "ucsb-new-venture-competition-2024",
    title: "Eyeclimate wins UCSB New Venture Competition 2024",
    excerpt:
      "Recognized for combining peer-reviewed research with operational AI products.",
    category: "Company",
    date: "May 14, 2026",
    image: "/figma/news/card-3-team.webp",
    author: "Satish Kumar",
    readTime: "4 min read",
  },
  {
    slug: "refinery-methane-study",
    title:
      "Three-year refinery methane study yields 100+ leak events from satellite",
    excerpt:
      "Historical Sentinel-2 observations reveal high-impact sources and support field verification.",
    category: "Field report",
    date: "March 18, 2026",
    image: "/figma/news-index/thumb-birds-2.webp",
    author: "Camila Machado",
    readTime: "9 min read",
  },
  {
    slug: "hyperspectral-transformers",
    title:
      "Spectral absorption-aware transformers for hyperspectral methane detection",
    excerpt:
      "Our CVPR paper introduces a robust architecture for methane source separation.",
    category: "Research",
    date: "March 2, 2026",
    image: "/figma/news-index/thumb-team.webp",
    author: "Victor Sheperd",
    readTime: "11 min read",
  },
  {
    slug: "methanemapper-v35",
    title: "What’s new in MethaneMapper v3.5",
    excerpt:
      "Faster inference, improved plume isolation, and new operational reporting outputs.",
    category: "Product",
    date: "February 18, 2026",
    image: "/figma/news-index/thumb-heatmap.webp",
    author: "Satish Kumar",
    readTime: "5 min read",
  },
];

export const featuredArticle =
  articles.find((article) => article.featured) ?? articles[0];
export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
