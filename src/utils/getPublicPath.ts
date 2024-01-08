export const getBaseUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  } else if (process.env.NODE_ENV === "production") {
    return "https://standupwiki.com"
  }
  return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
};