export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "development") {
    return "http://localhost:3000";
  } else if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    return "https://standupwiki.com"
  }
  // TODO: for api in preview env, it did not work
  return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
};