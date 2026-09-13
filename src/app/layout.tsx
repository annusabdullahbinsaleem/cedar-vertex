import type { Metadata } from "next";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cedarvertex.com"),
  title: "Cedar Vertex | Digital Design & Technology Studio",
  description:
    "Cedar Vertex helps businesses create modern digital experiences through UI/UX design, web development, mobile development, accessibility, SEO and digital branding.",
  keywords: [
    "Cedar Vertex",
    "UI/UX design studio",
    "web development agency",
    "mobile app development",
    "accessibility consulting",
    "digital branding",
  ],
  openGraph: {
    title: "Cedar Vertex | Digital Design & Technology Studio",
    description:
      "A design and technology studio helping businesses turn ideas into modern digital products.",
    url: "https://cedarvertex.com",
    siteName: "Cedar Vertex",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cedar Vertex | Digital Design & Technology Studio",
    description:
      "A design and technology studio helping businesses turn ideas into modern digital products.",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      {
        url: "/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.ico",
      },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-bg text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
