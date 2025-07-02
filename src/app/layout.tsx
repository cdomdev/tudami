import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "@/app/globals.css";
import { NavBar } from "@/components/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionHydrator } from "@/app/auth/callback/SessionHydrator";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const balooFont = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tudami",
    template: "%s | Tudami",
  },
  description: "Aprende con otros. Comparte con todos.",
  metadataBase: new URL("https://tudami.com"),
  openGraph: {
    title: "Tudami",
    description: "Aprende con otros. Comparte con todos.",
    url: "https://tudami.com",
    siteName: "Tudami",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tudami App",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tudami",
    description: "Aprende con otros. Comparte con todos.",
    creator: "@tudami",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
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
    <html
      lang="es"
      className={`  ${balooFont.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div
            aria-hidden="true"
            className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden
    bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]
    dark:bg-[radial-gradient(#ffffff1a_1px,#111827_1px)] dark:bg-[size:24px_24px]"
          />
          <SessionHydrator />
          <NavBar />
          <main className="w-screen min-h-dvh">{children}</main>
          <Toaster position="top-center" theme="system" />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
