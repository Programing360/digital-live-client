export const siteMetadata = {
  title: {
    default: "Digital Life Lessons",
    template: "%s | Digital Life Lessons",
  },
  description:
    "Digital Life Lessons is a modern learning platform where users can explore educational lessons, improve their skills, and connect with a growing learning community.",

  metadataBase: new URL("https://digital-live-client.vercel.app"),

  keywords: [
    "Digital Life Lessons",
    "Online Learning",
    "Education",
    "Learning Platform",
    "Next.js",
    "React",
  ],

  authors: [{ name: "MD Limon" }],
  creator: "MD Limon",

  openGraph: {
    title: "Digital Life Lessons",
    description:
      "Learn, grow, and explore high-quality digital lessons with an interactive learning experience.",
    url: "https://digital-live-client.vercel.app",
    siteName: "Digital Life Lessons",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Digital Life Lessons",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Digital Life Lessons",
    description:
      "Learn, grow, and explore high-quality digital lessons.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};