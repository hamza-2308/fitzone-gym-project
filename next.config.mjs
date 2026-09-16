/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  // Ensure the seed database file is bundled with the serverless functions
  // on hosts like Vercel, where files read at runtime via process.cwd() are
  // not automatically traced.
  outputFileTracingIncludes: {
    "/**/*": ["./data/db.json"],
  },
};

export default nextConfig;