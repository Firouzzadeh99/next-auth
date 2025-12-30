import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/<REPO_NAME>" : "",
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
