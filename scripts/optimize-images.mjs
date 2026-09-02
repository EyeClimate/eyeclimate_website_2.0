import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const sourceRoots = ["app", "components", "lib"];
const sourceExtensions = new Set([".ts", ".tsx", ".js", ".mjs"]);
const rasterPattern = /["'](\/[^"']+\.(?:png|jpe?g))["']/gi;

async function sourceFiles(directory) {
  const entries = await fs.readdir(path.join(projectRoot, directory), {
    withFileTypes: true,
  });
  const files = [];
  for (const entry of entries) {
    const relative = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await sourceFiles(relative)));
    else if (sourceExtensions.has(path.extname(entry.name)))
      files.push(relative);
  }
  return files;
}

function maximumWidth(publicPath) {
  if (
    publicPath.includes("/images/team/") ||
    publicPath.includes("/images/advisors/")
  )
    return 640;
  if (publicPath.includes("author-avatar")) return 320;
  if (publicPath.includes("hero") || publicPath.includes("background"))
    return 1920;
  return 1600;
}

const files = (await Promise.all(sourceRoots.map(sourceFiles))).flat();
const references = new Set();
for (const file of files) {
  const content = await fs.readFile(path.join(projectRoot, file), "utf8");
  for (const match of content.matchAll(rasterPattern)) {
    if (!match[1].startsWith("/partners/")) references.add(match[1]);
  }
}

const replacements = new Map();
for (const publicPath of references) {
  const input = path.join(projectRoot, "public", publicPath.slice(1));
  try {
    await fs.access(input);
  } catch {
    continue;
  }
  const optimizedPath = publicPath.replace(/\.(?:png|jpe?g)$/i, ".webp");
  const output = path.join(projectRoot, "public", optimizedPath.slice(1));
  await sharp(input)
    .rotate()
    .resize({
      width: maximumWidth(publicPath),
      withoutEnlargement: true,
      fit: "inside",
    })
    .webp({ quality: 80, effort: 5, smartSubsample: true })
    .toFile(output);
  replacements.set(publicPath, optimizedPath);
}

for (const file of files) {
  const absolute = path.join(projectRoot, file);
  let content = await fs.readFile(absolute, "utf8");
  const original = content;
  for (const [from, to] of replacements) content = content.replaceAll(from, to);
  if (content !== original) await fs.writeFile(absolute, content);
}

console.log(
  `Optimized and rewrote ${replacements.size} referenced raster images.`,
);
