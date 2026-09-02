import type { Metadata } from "next";
import CaseStudy, { CaseStudyData } from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "Methane Monitoring | Eyeclimate",
  description:
    "Multi-year refinery methane monitoring from space using Sentinel-2.",
};
const data: CaseStudyData = {
  breadcrumb: "Refinery methane monitoring",
  tags: ["MethaneMapper", "Satellite", "Sentinel-2", "ESG"],
  title:
    "Multi-year refinery methane monitoring from space. Turning satellite data into ESG-grade evidence.",
  intro:
    "A retrospective study of a major refinery in Riyadh, Saudi Arabia, using Sentinel-2 imagery at 20 m resolution. Three years of observations, more than 100 leak events detected, and a complete detect-verify-mitigate-verify loop.",
  stats: [
    { value: "100", unit: "+", label: "Leak events detected" },
    { value: "2021–23", label: "Monitoring period" },
    { value: "20", unit: "m", label: "Spatial resolution" },
    { value: "3–30", unit: "k kg/h", label: "Emissions range" },
  ],
  hero: {
    src: "/figma/case-study-methane-monitoring/hero-satellite-map.webp",
    alt: "Satellite view of a refinery in a desert landscape",
  },
  sections: [
    {
      id: "context",
      number: "01",
      title: "Context",
      paragraphs: [
        "A major refinery in Riyadh, Saudi Arabia engaged in a methane emissions analysis to better understand and manage fugitive emissions across its operations. Due to privacy requirements, the refinery name and exact location remain undisclosed.",
        "Using Sentinel-2 satellite imagery at 20-meter spatial resolution and our proprietary methane detection algorithm, MethaneMapper, we conducted a retrospective methane monitoring study spanning 2021 to 2023. The goal was to identify significant methane leaks, quantify emission rates, and provide actionable intelligence to support mitigation and ESG reporting efforts.",
      ],
    },
    {
      id: "challenge",
      number: "02",
      title: "Challenge",
      paragraphs: [
        "Refineries are complex industrial environments with large footprints, multiple emission sources, and limited visibility into intermittent methane releases. Traditional on-ground inspections and sensor-based surveys are valuable, but they are resource-intensive and may miss leaks that occur across large areas or over long time periods.",
        "The refinery owner needed a scalable way to:",
      ],
      bullets: [
        "Monitor methane emissions over time",
        "Identify previously undetected leaks",
        "Quantify emission magnitude",
        "Prioritize on-site inspections and corrective action",
        "Generate credible evidence for sustainability and ESG initiatives",
      ],
      callout:
        "The key challenge was turning satellite observations into operationally useful intelligence — guiding field teams toward the most critical problem areas, not just delivering pretty heatmaps.",
    },
    {
      id: "solution",
      number: "03",
      title: "Solution",
      paragraphs: [
        "We deployed MethaneMapper on Sentinel-2 imagery to analyze the refinery over a three-year monitoring window. The system processed historical satellite observations to detect methane plumes, estimate emission rates, and map approximate source locations across the site.",
        "Our team produced detailed reports containing:",
        "These reports were shared with the refinery owner, enabling their operations team to validate findings and plan follow-up action. Based on the satellite-derived intelligence, the owner conducted targeted field surveys using local sensor systems to pinpoint leak sources more precisely and implement mitigation measures.",
        "Following mitigation, we re-ran the analysis to assess changes over time and provide updated evidence of emissions reduction — closing the loop from detection → verification → mitigation → verification.",
      ],
      figure: {
        src: "/figma/case-study-methane-monitoring/solution-visual.webp",
        alt: "Satellite analysis of the monitored refinery",
        caption: "July 09, 2022 · Detected: 11,839 kg/hr",
      },
      numbered: [
        "Estimated methane emission quantities per source",
        "Source location insights across the refinery footprint",
        "Event timing and leak occurrence history",
        "Cumulative leak history across the full study period",
      ],
    },
  ],
  resultsIntro:
    "The analysis identified more than 100 methane leak events across the refinery during the study period. Estimated emissions ranged from approximately 3,000 kg/hour to 30,000 kg/hour — revealing a number of high-impact emission sources that may otherwise have remained difficult to track systematically.",
  results: [
    {
      eyebrow: "01 / Detection",
      value: "100",
      unit: "+ events",
      copy: "Methane leak events identified across 2021–2023.",
    },
    {
      eyebrow: "02 / Magnitude",
      value: "3–30",
      unit: "k kg/h",
      copy: "Quantified emissions at operationally significant levels.",
    },
    {
      eyebrow: "03 / Action",
      value: "Field-verified",
      copy: "On-site sensor surveys confirmed sources and informed mitigation.",
    },
    {
      eyebrow: "04 / Compliance",
      value: "ESG-ready",
      copy: "Follow-up analysis supporting reporting and progress evidence.",
    },
  ],
  resultsOutro:
    "This case demonstrates how satellite-based methane monitoring can move industrial operators from detection to verification, mitigation, and measurable progress toward sustainability objectives — without disrupting day-to-day operations on the ground.",
  ctaTitle: "Operating a refinery, pipeline, or industrial site?",
  ctaCopy:
    "We help operators turn satellite data into ESG-grade evidence — from baseline assessments to ongoing compliance monitoring.",
  related: [
    {
      tag: "MethaneMapper",
      title: "Satellite methane monitoring across pipeline networks",
      meta: "Airborne · AVIRIS-NG · 25 km flight line",
      image: "/figma/case-study-methane-monitoring/related-pipeline.webp",
      href: "/use-cases/methane-detection",
    },
    {
      tag: "WildlifeMapper",
      title: "AI detection of multiple species in survey imagery",
      meta: "Drone · Conservation",
      image: "/figma/case-study-methane-monitoring/related-elephant.webp",
      href: "/product/wildlifemapper",
    },
  ],
};
export default function MethaneMonitoringPage() {
  return <CaseStudy data={data} />;
}
