import type { Metadata } from "next";
import CaseStudy, { CaseStudyData } from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "Methane Detection | Eyeclimate",
  description:
    "Detecting and quantifying methane sources in a complex multi-emission site under high winds.",
};
const data: CaseStudyData = {
  breadcrumb: "Methane detection",
  tags: ["MethaneMapper", "Airborne hyperspectral", "AVIRIS-NG"],
  title:
    "Detecting and quantifying methane sources in a complex multi-emission site under high winds.",
  intro:
    "Evaluating MethaneMapper on NASA JPL's AVIRIS-NG hyperspectral data. 426 spectral bands, 25 km flight line, multiple overlapping plumes, 4+ m/s winds.",
  stats: [
    { value: "25", unit: "km", label: "Flight line" },
    { value: "426", label: "Spectral bands" },
    { value: "<4", unit: "min", label: "Processing time" },
    { value: "30–250", unit: "kg/h", label: "Emissions detected" },
  ],
  hero: {
    src: "/figma/case-study-methane-detection/hero-oilfield.webp",
    alt: "Industrial landscape at sunrise",
    caption: "AVIRIS-NG hyperspectral capture · methane plume signatures",
  },
  sections: [
    {
      id: "context",
      number: "01",
      title: "Context",
      paragraphs: [
        "We collaborated on methane analysis using AVIRIS-NG, NASA Jet Propulsion Laboratory's airborne hyperspectral sensor. The dataset was shared with us by Sarah Ludreen and provided a high-resolution spectral view across 426 channels, spanning wavelengths from 400 nm to 2400 nm — visible to short-wave infrared.",
        "This case study focused on evaluating the performance of our proprietary algorithm, MethaneMapper, on a highly complex airborne dataset designed to test both detection sensitivity and source separation under difficult real-world conditions.",
      ],
    },
    {
      id: "challenge",
      number: "02",
      title: "Challenge",
      paragraphs: [
        "Airborne methane analysis becomes significantly more difficult when:",
        "In this dataset, the site contained several nearby emission points under wind speeds greater than 4 m/s — one of the more challenging scenarios for methane detection and attribution.",
      ],
      bullets: [
        "Multiple emission sources are located close to one another",
        "Plume signatures overlap spatially",
        "Strong winds disperse methane rapidly",
      ],
      callout:
        "The key challenge was not only to detect methane presence, but to correctly distinguish each individual source and quantify emissions accurately despite plume interference and wind-driven dispersion.",
    },
    {
      id: "solution",
      number: "03",
      title: "Solution",
      paragraphs: [
        "We applied MethaneMapper to the AVIRIS-NG hyperspectral dataset and processed a 25 km flight line using our high-speed methane analytics pipeline.",
        "Leveraging the rich spectral information captured across 426 bands, MethaneMapper was able to:",
        "The full dataset for the 25 km flight line was processed in under 4 minutes, demonstrating speed and operational efficiency on computationally demanding hyperspectral data.",
      ],
      figure: {
        src: "/figma/case-study-methane-detection/solution-visual.webp",
        alt: "Ground terrain beside MethaneMapper plume visualization",
        caption: "Ground Terrain Visualization & MethaneMapper Plume Detection",
      },
      numbered: [
        "Isolate methane signatures from background signals",
        "Separate closely spaced emission plumes",
        "Identify each individual emission source",
        "Quantify emissions for each source independently",
      ],
    },
  ],
  resultsIntro:
    "MethaneMapper successfully detected and quantified individual emission sources in a complex, high-wind environment where multiple nearby leaks were present.",
  results: [
    {
      eyebrow: "01 / Detection",
      value: "Source-level",
      copy: "Accurate detection in a multi-emission scenario with overlapping plumes.",
    },
    {
      eyebrow: "02 / Conditions",
      value: ">4",
      unit: "m/s",
      copy: "Successful operation under strong wind dispersion.",
    },
    {
      eyebrow: "03 / Range",
      value: "30–250",
      unit: "kg/h",
      copy: "Quantified emissions across an order of magnitude.",
    },
    {
      eyebrow: "04 / Speed",
      value: "<4",
      unit: "min",
      copy: "Processing of full 25 km flight line.",
    },
  ],
  resultsOutro:
    "This case study highlights MethaneMapper's ability to deliver fast and precise methane intelligence even in difficult sensing conditions — making it a strong solution for advanced airborne monitoring workflows.",
  ctaTitle: "Have a dataset that needs this kind of analysis?",
  ctaCopy:
    "We work with research teams, operators, and agencies on airborne and satellite methane intelligence.",
  related: [
    {
      tag: "MethaneMapper",
      title: "Satellite methane monitoring across pipeline networks",
      meta: "Satellite · Multi-region",
      image: "/figma/case-study-methane-detection/related-earth.webp",
      href: "/use-cases/methane-monitoring",
    },
    {
      tag: "WildlifeMapper",
      title: "AI detection of multiple species in survey imagery",
      meta: "Drone · Conservation",
      image: "/figma/case-study-methane-detection/related-wildebeest.webp",
      href: "/product/wildlifemapper",
    },
  ],
};
export default function MethaneDetectionPage() {
  return <CaseStudy data={data} />;
}
