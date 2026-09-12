import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  appendVary,
  isNegotiablePath,
  preferredRepresentation,
} from "../lib/content-negotiation.ts";

test("content negotiation defaults to HTML and selects Markdown", () => {
  assert.equal(preferredRepresentation(null), "text/html");
  assert.equal(preferredRepresentation("*/*"), "text/html");
  assert.equal(preferredRepresentation("text/markdown"), "text/markdown");
  assert.equal(
    preferredRepresentation("text/html;q=0.5, text/markdown;q=0.9"),
    "text/markdown",
  );
});

test("content negotiation honors specificity, q=0, and 406 cases", () => {
  assert.equal(
    preferredRepresentation("text/html;q=0, */*;q=1"),
    "text/markdown",
  );
  assert.equal(
    preferredRepresentation("text/markdown;q=0, text/html;q=0"),
    null,
  );
  assert.equal(preferredRepresentation("application/pdf"), null);
});

test("Vary preserves existing values and adds negotiation dimensions once", () => {
  const headers = new Headers({ Vary: "Accept-Encoding" });
  appendVary(headers, "Accept");
  appendVary(headers, "accept");
  assert.equal(headers.get("Vary"), "Accept-Encoding, Accept");
});

test("only public document paths are negotiated", () => {
  assert.equal(isNegotiablePath("/about"), true);
  assert.equal(isNegotiablePath("/news/example"), true);
  assert.equal(isNegotiablePath("/api/contact"), false);
  assert.equal(isNegotiablePath("/portal"), false);
  assert.equal(isNegotiablePath("/sitemap.xml"), false);
});

test("agent discovery, recovery, privacy, and schema contracts are present", async () => {
  const [agentContent, notFound, privacy, layout, manifest, sitemap, footer] =
    await Promise.all([
      readFile("lib/agent-content.ts", "utf8"),
      readFile("app/not-found.tsx", "utf8"),
      readFile("app/privacy/page.tsx", "utf8"),
      readFile("app/layout.tsx", "utf8"),
      readFile("app/manifest.ts", "utf8"),
      readFile("app/sitemap.ts", "utf8"),
      readFile("components/Footer.tsx", "utf8"),
    ]);

  assert.match(agentContent, /# Eyeclimate/);
  assert.match(agentContent, /## When to use Eyeclimate/);
  assert.match(agentContent, /\/sitemap\.xml/);
  assert.match(agentContent, /info@eyeclimate\.com/);
  assert.match(notFound, /404 · Page not found/);
  assert.match(notFound, /Return to Eyeclimate/);
  assert.doesNotMatch(notFound, /Browse the sitemap|Read agent guidance/);
  assert.ok(privacy.length > 500);
  assert.match(layout, /"@type": "Organization"/);
  assert.match(layout, /description:/);
  assert.match(layout, /contactPoint:/);
  assert.match(layout, /"@type": "PostalAddress"/);
  assert.match(layout, /url: "\/favicon\.png"/);
  assert.match(layout, /sizes: "144x144"/);
  assert.match(manifest, /src: "\/icon-512\.png"/);
  assert.match(manifest, /sizes: "512x512"/);
  assert.match(sitemap, /"\/privacy"/);
  assert.match(footer, /\["Privacy", "\/privacy"\]/);
});
