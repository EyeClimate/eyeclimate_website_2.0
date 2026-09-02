import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceRoot = "C:/Users/sunny/Downloads/eyeclimate_partner";
const outputRoot = "public/partners/mono";

const logos = {
  "scepter-air.png": "1 spectar air.webp",
  "mara-elephant-project.png": "mara-elephant-project.png",
  "safisha-nchi.png": "Safisha Nchi.jpg",
  "pergam-italia.png": "pergam-italia.png",
  "stanford.png": "Stanford-Symbol.png",
  "ucsb.png": "uc santa barbara.jpg",
  "smithsonian-national-zoo.png": "smithsonian.svg",
  "iit-delhi-clean.png": "iit delhi.png",
  "iit-kanpur.png": "iit kanput.png",
  "mozilla-foundation.png": "mozilla logo.jpeg",
  "cnsi-ucsb.png": "cnsi-ucsb.png",
  "schmidt-sciences.png": "schmidt_science_fellows_logo_hz_final_Logo.jpg",
  "google-for-startups.png": "google-for-startups.png",
  "nvidia-inception.png": "nvidia-inception.png",
  "global-wildlife-conservation.png": "global-wildlife-conservation.png",
};

const preserveSourceAlpha = new Set([
  "scepter-air.png",
  "smithsonian-national-zoo.png",
]);

await fs.mkdir(outputRoot, { recursive: true });

for (const [outputName, sourceName] of Object.entries(logos)) {
  const sourcePath = path.join(sourceRoot, sourceName);
  const { data, info } = await sharp(sourcePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const whiteLogo = Buffer.alloc(data.length);
  const contrastFloor = outputName === "iit-delhi-clean.png" ? 42 : 8;
  for (let index = 0; index < data.length; index += 4) {
    const sourceAlpha = data[index + 3];
    const backgroundContrast =
      255 - Math.min(data[index], data[index + 1], data[index + 2]);
    const contrastAlpha = Math.min(
      sourceAlpha,
      Math.min(255, Math.max(0, (backgroundContrast - contrastFloor) * 1.7)),
    );
    const alpha = preserveSourceAlpha.has(outputName)
      ? sourceAlpha
      : contrastAlpha;

    whiteLogo[index] = 255;
    whiteLogo[index + 1] = 255;
    whiteLogo[index + 2] = 255;
    whiteLogo[index + 3] = alpha;
  }

  await sharp(whiteLogo, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .trim({
      background: { r: 255, g: 255, b: 255, alpha: 0 },
      threshold: 8,
    })
    .resize({
      width: 420,
      height: 120,
      fit: "inside",
      withoutEnlargement: true,
    })
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(outputRoot, outputName));

  console.log(`Converted ${sourceName} -> ${outputName}`);
}
