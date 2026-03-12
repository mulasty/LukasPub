export function getSiteUrl() {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "";

  if (!rawUrl) {
    return "";
  }

  return rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
}

