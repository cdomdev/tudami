import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "@/app/globals.css";
import { NavBar } from "@/components/NavBar";
import { ThemeProvider } from "@/components/theme-provider";

const rubikFont = Rubik({
  variable: "--font-rubik",
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
  // x
  twitter: {
    card: "summary_large_image",
    title: "Tudami",
    description: "Aprende con otros. Comparte con todos.",
    creator: "@tudami",
    images: ["/og-image.png"],
  },
  // favicon
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
    <html lang="es" className={rubikFont.variable} suppressHydrationWarning>
      <body className="antialiased bg-accent text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <main className="min-h-dvh ">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
