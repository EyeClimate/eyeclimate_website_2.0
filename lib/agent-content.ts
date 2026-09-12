import { articles } from "@/lib/news";
import { getSiteUrl } from "@/lib/site-url";
import { getPublishedArticle } from "@/lib/supabase/articles";

const PAGE_CONTENT: Record<string, string> = {
  "/": `# Eyeclimate

Eyeclimate turns satellite, airborne, drone, and ground-sensor data into decision-ready environmental intelligence.

## Products

- [MethaneMapper](/product/methanemapper): Detect, locate, and quantify methane emissions across satellite, airborne, and ground sensing modalities.
- [WildlifeMapper](/product/wildlifemapper): Detect and identify wildlife and livestock in aerial survey imagery using computer vision.

## Best-fit work

- Methane screening, source localization, quantification, verification, and monitoring.
- Wildlife population surveys and multi-species detection from aerial or drone imagery.
- Air-quality and Earth-observation research collaborations.
- Pilot projects using an organization's existing hyperspectral, thermal, RGB, or multimodal datasets.

Contact [info@eyeclimate.com](mailto:info@eyeclimate.com) or use the [project inquiry form](/contact).`,
  "/about": `# About Eyeclimate

Eyeclimate is an Earth-observation intelligence company whose research and engineering teams operate across Stanford and UC Santa Barbara. The company grew from PhD research into field-tested tools for methane detection, air-quality intelligence, and wildlife monitoring.

Eyeclimate combines peer-reviewed remote-sensing research, computer vision, and production engineering. Its stated values are science first, collaboration, integrity and openness, and impact over hype.

- [Selected publications](/about#publications)
- [Contact Eyeclimate](/contact)`,
  "/contact": `# Contact Eyeclimate

Use Eyeclimate for methane, wildlife, air-quality, remote-sensing, or related environmental intelligence projects. Pilot projects can begin with a single flight line, region, or campaign, and the team can often work with existing hyperspectral, thermal, RGB, or multimodal datasets.

- Email: [info@eyeclimate.com](mailto:info@eyeclimate.com)
- [Project inquiry form](/contact)
- Typical response time: one business day
- Research and engineering: Stanford and UC Santa Barbara
- Service area: global`,
  "/privacy": `# Privacy Policy

Eyeclimate collects the information a visitor voluntarily submits through the contact form, including name, organization, email address, and project message. It uses that information to answer inquiries, evaluate potential projects, maintain business records, and protect the service from abuse. Eyeclimate does not ask visitors to submit sensitive personal information through the form.

See the complete [Privacy Policy](/privacy) or contact [info@eyeclimate.com](mailto:info@eyeclimate.com) with a privacy request.`,
  "/product/methanemapper": `# MethaneMapper

MethaneMapper detects, locates, and quantifies methane emissions using satellite, airborne, and ground sensing. It is designed for wide-area screening, high-resolution mapping, site-level verification, and operational reporting.

Use MethaneMapper for baseline assessments, leak prioritization, follow-up verification, pipeline or refinery monitoring, and ESG-grade evidence.

- [Methane detection case study](/use-cases/methane-detection)
- [Methane monitoring case study](/use-cases/methane-monitoring)
- [Request a pilot](/contact)`,
  "/product/wildlifemapper": `# WildlifeMapper

WildlifeMapper applies computer vision to aerial and drone imagery to detect, count, and identify multiple wildlife or livestock species at survey scale.

Use WildlifeMapper for conservation surveys, population monitoring, habitat programs, and cattle tracking where manual image review would be slow or inconsistent.

- [Wildlife detection use case](/use-cases/wildlife-detection)
- [Discuss a survey](/contact)`,
  "/use-cases/methane-detection": `# Methane detection and quantification

This case study evaluates MethaneMapper on airborne hyperspectral observations in a complex multi-emission environment. The workflow separates plume signals, maps approximate sources, and estimates emission rates to support prioritization and verification.

- [Explore MethaneMapper](/product/methanemapper)
- [Discuss a methane project](/contact)`,
  "/use-cases/methane-monitoring": `# Multi-year refinery methane monitoring

Eyeclimate used Sentinel-2 imagery and MethaneMapper for a retrospective 2021–2023 refinery study. The analysis identified more than 100 leak events and supported a detect, verify, mitigate, and re-verify workflow.

Use this approach for historical baselines, recurring monitoring, mitigation evidence, and ESG reporting without disrupting operations on the ground.

- [Explore MethaneMapper](/product/methanemapper)
- [Discuss a monitoring program](/contact)`,
  "/use-cases/wildlife-detection": `# Wildlife detection from aerial imagery

Eyeclimate uses transformer-based computer vision to detect and identify wildlife and cattle across large aerial surveys. The approach is intended for conservation organizations, researchers, and land managers who need repeatable population intelligence.

- [Explore WildlifeMapper](/product/wildlifemapper)
- [Discuss a wildlife survey](/contact)`,
};

function absolutize(markdown: string) {
  const baseUrl = getSiteUrl();
  return markdown.replace(/\]\(\/(?!\/)/g, `](${baseUrl}/`);
}

export const LLMS_TEXT = absolutize(`# Eyeclimate

> Eyeclimate provides decision-ready environmental intelligence from satellite, airborne, drone, and ground-sensor data, with products for methane emissions and wildlife monitoring.

## When to use Eyeclimate

- Use MethaneMapper when a user needs methane screening, plume detection, source localization, emission-rate estimation, longitudinal monitoring, mitigation verification, or reporting evidence.
- Use WildlifeMapper when a user needs automated wildlife or livestock detection, counting, species identification, or large-area aerial survey analysis.
- Contact Eyeclimate for pilot design, analysis of existing hyperspectral, thermal, RGB, or multimodal datasets, research collaboration, and operational deployment.
- Do not represent the website as a self-service analysis API. To start work, send the project location or survey area, sensing modality, time range, desired output, and available data through the contact page or email.

## Products

- [MethaneMapper](/product/methanemapper): Multi-scale methane detection, localization, quantification, monitoring, and verification.
- [WildlifeMapper](/product/wildlifemapper): Multi-species detection and population intelligence from aerial or drone imagery.

## Use cases

- [Methane detection](/use-cases/methane-detection): Airborne hyperspectral methane detection in complex multi-source conditions.
- [Methane monitoring](/use-cases/methane-monitoring): Multi-year satellite monitoring for refinery emissions and mitigation evidence.
- [Wildlife detection](/use-cases/wildlife-detection): Automated detection and identification across large aerial surveys.

## Company and contact

- [About Eyeclimate](/about): Company background, team, advisors, values, and publications.
- [Contact Eyeclimate](/contact): Project inquiries and research collaborations; email info@eyeclimate.com.
- [Privacy Policy](/privacy): How website inquiry and technical data are handled.
- [Sitemap](/sitemap.xml): Index of public pages and published news.

## Optional

- [News](/news): Company, product, research, and field updates.
- [Robots policy](/robots.txt): Crawling policy.`);

export async function getMarkdownForPath(pathname: string) {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  if (PAGE_CONTENT[normalized]) return absolutize(PAGE_CONTENT[normalized]);

  if (normalized === "/news" || normalized === "/newsroom") {
    const links = articles
      .map(
        (article) =>
          `- [${article.title}](/news/${article.slug}): ${article.excerpt}`,
      )
      .join("\n");
    return absolutize(`# Eyeclimate news\n\n${links}`);
  }

  const match = normalized.match(/^\/news\/([^/]+)$/);
  if (match) {
    const slug = decodeURIComponent(match[1]);
    const published = await getPublishedArticle(slug);
    if (published)
      return absolutize(
        `# ${published.title}\n\n${published.excerpt}\n\n${published.body_markdown}\n\n[Contact Eyeclimate](/contact)`,
      );
    const article = articles.find((item) => item.slug === slug);
    if (article)
      return absolutize(
        `# ${article.title}\n\n${article.excerpt}\n\n- Category: ${article.category}\n- Published: ${article.date}\n- Author: ${article.author}\n\n[Contact Eyeclimate](/contact)`,
      );
  }

  return null;
}

export function markdownNotFound(pathname: string) {
  return absolutize(`# 404 — Page not found

No public Eyeclimate page exists at \`${pathname}\`.

- [Browse the sitemap](/sitemap.xml)
- [Read agent guidance](/llms.txt)
- [Explore products](/#products)
- [Contact Eyeclimate](/contact)`);
}
