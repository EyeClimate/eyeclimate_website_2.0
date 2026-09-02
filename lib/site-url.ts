export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://eyeclimate.com").replace(
    /\/$/,
    "",
  );
}

export function getAbsoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path, `${getSiteUrl()}/`).toString();
}
