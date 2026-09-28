import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { SmoothScroll } from "@/components/common/SmoothScroll";
import { CustomCursor } from "@/components/common/CustomCursor";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import { Preloader } from "@/components/common/Preloader";
import { PERSONAL_INFO } from "@/data/content";

const fontDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const fontBody = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F0EA" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0B10" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jayeshmali.dev"),
  title: "Jayesh Mali &mdash; Full Stack Developer & Creative Technologist",
  description:
    "Production portfolio of Jayesh Mali, Full Stack Developer from Surat, Gujarat. Architecting responsive React/Next.js systems, high-performance Node APIs, and editorial kinetic interfaces.",
  keywords: [
    "Jayesh Mali",
    "Full Stack Developer Surat",
    "React Developer Gujarat",
    "Next.js 15 Developer",
    "MERN Stack Developer India",
    "Frontend Engineer Portfolio",
    "Creative Developer Awwwards"
  ],
  authors: [{ name: "Jayesh Mali", url: PERSONAL_INFO.github }],
  creator: "Jayesh Mali",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jayeshmali.dev",
    siteName: "Jayesh Mali Portfolio",
    title: "Jayesh Mali &mdash; Full Stack Developer",
    description:
      "Full Stack Developer from Surat, Gujarat. Specialized in React.js, Next.js 15, Node.js, and cloud ecosystems.",
    images: [
      {
        url: "/images/jayesh.png",
        width: 800,
        height: 1100,
        alt: "Jayesh Mali - Full Stack Developer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayesh Mali &mdash; Full Stack Developer",
    description:
      "Full Stack Developer from Surat, Gujarat. Specialized in React.js, Next.js 15, Node.js, and cloud ecosystems.",
    images: ["/images/jayesh.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSONAL_INFO.name,
    jobTitle: PERSONAL_INFO.title,
    email: PERSONAL_INFO.email,
    telephone: PERSONAL_INFO.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: PERSONAL_INFO.city,
      addressRegion: PERSONAL_INFO.state,
      addressCountry: "IN"
    },
    url: "https://jayeshmali.dev",
    sameAs: [PERSONAL_INFO.github, PERSONAL_INFO.linkedin],
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js 15",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "Tailwind CSS"
    ]
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-[#3D5AFE] selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScroll>
            {/* Film grain noise overlay */}
            <div className="noise-overlay" aria-hidden="true" />
            <ScrollProgress />
            <CustomCursor />
            <Preloader />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
