"use client";

import { useEffect, useRef, useState } from "react";
import type { GlobeInstance } from "globe.gl";

type EmissionPoint = {
  lat: number;
  lng: number;
  emission: number;
};

export default function InteractiveMethaneGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeInstance | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mounted = true;
    let resizeObserver: ResizeObserver | undefined;
    let delayHandle: ReturnType<typeof setTimeout> | undefined;
    let started = false;

    async function initialize() {
      const [{ default: Globe }, { csvParse }] = await Promise.all([
        import("globe.gl"),
        import("d3-dsv"),
      ]);
      const response = await fetch("/data_emissions.csv");
      if (!response.ok)
        throw new Error("Unable to load methane emissions data");

      const csv = await response.text();
      const points = csvParse(csv, (row) => {
        const match = row["Latitude, Longitude"]?.match(
          /\(([^,]+),\s*([^)]+)\)/,
        );
        const emission = Number(row["emission rate"]);
        if (!match || !Number.isFinite(emission)) return null;
        return { lat: Number(match[1]), lng: Number(match[2]), emission };
      }).filter((point): point is EmissionPoint => Boolean(point));

      if (!mounted || !containerRef.current) return;

      const globe = new Globe(containerRef.current, {
        animateIn: false,
        waitForGlobeReady: true,
      })
        .globeImageUrl("/images/globe/earth-blue-marble.webp")
        .bumpImageUrl("/images/globe/earth-topology.webp")
        .backgroundColor("rgba(0,0,0,0)")
        .width(containerRef.current.clientWidth)
        .height(containerRef.current.clientHeight)
        .heatmapsData([points])
        .heatmapPointLat("lat")
        .heatmapPointLng("lng")
        .heatmapPointWeight("emission")
        .heatmapBandwidth(1.25)
        .heatmapColorSaturation(2.8)
        .enablePointerInteraction(true);

      globeRef.current = globe;
      const controls = globe.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.35;
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      // Keep the globe comfortably inside its visual area at maximum zoom-in.
      controls.minDistance = 285;
      controls.maxDistance = 420;
      globe.pointOfView({
        lat: 18,
        lng: 32,
        altitude: window.innerWidth < 768 ? 2.5 : 1.85,
      });
      globe.onGlobeReady(() => mounted && setReady(true));

      resizeObserver = new ResizeObserver(([entry]) => {
        if (!entry || !globeRef.current) return;
        globeRef.current
          .width(entry.contentRect.width)
          .height(entry.contentRect.height);
        globeRef.current.pointOfView({
          altitude: window.innerWidth < 768 ? 2.5 : 1.85,
        });
      });
      resizeObserver.observe(containerRef.current);
    }

    const start = () => {
      if (started || !mounted) return;
      started = true;
      if (delayHandle !== undefined) clearTimeout(delayHandle);
      initialize().catch((error) =>
        console.error("Interactive globe failed to initialize", error),
      );
    };

    const scheduleAfterInitialPaint = () => {
      delayHandle = setTimeout(start, 0);
    };

    if (document.readyState === "complete") {
      scheduleAfterInitialPaint();
    } else {
      window.addEventListener("load", scheduleAfterInitialPaint, {
        once: true,
      });
    }

    // A user who tries to interact with the globe should not have to wait for
    // the automatic post-LCP initialization.
    container.addEventListener("pointerdown", start, { once: true });

    return () => {
      mounted = false;
      window.removeEventListener("load", scheduleAfterInitialPaint);
      container.removeEventListener("pointerdown", start);
      if (delayHandle !== undefined) clearTimeout(delayHandle);
      resizeObserver?.disconnect();
      if (globeRef.current) {
        const controls = globeRef.current.controls();
        controls.dispose();
        globeRef.current._destructor();
        globeRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className="relative h-full w-full max-w-full overflow-hidden"
      aria-label="Interactive globe showing methane emission hotspots"
    >
      <div
        ref={containerRef}
        className={`h-full w-full max-w-full cursor-grab overflow-hidden transition-opacity duration-700 active:cursor-grabbing ${ready ? "opacity-100" : "opacity-0"}`}
      />
      <p
        className={`pointer-events-none absolute bottom-5 right-5 rounded-full border border-divider bg-bg-page/70 px-3 py-2 text-tiny uppercase tracking-label text-text-muted backdrop-blur-sm transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
      >
        Drag to rotate · Scroll to zoom
      </p>
    </div>
  );
}
