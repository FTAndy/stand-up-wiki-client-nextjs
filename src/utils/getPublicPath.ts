export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "development") {
    return "http://localhost:3000";
  } else if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    return "https://standupwiki.com"
  }
  // TODO: for api in Vercel preview env, the serverless API does not work
  return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
};

export const getAIServiceUrl = () => {
  // if (process.env.NODE_ENV === "development") {
    // return 'http://localhost:8787'
  return "https://standup-wiki-workers.ftandy.workers.dev";
  // }
  // return ''
}
