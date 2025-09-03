import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  // domian images
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "cdn.discordapp.com",
      "i.imgur.com",
      "images.unsplash.com",
      "cdn.pixabay.com",
      "www.gravatar.com",
      "pbs.twimg.com",
      "iyyeielwbsaybnczamix.supabase.co",
      "api.dicebear.com"
    ],
  }
};

export default nextConfig;
