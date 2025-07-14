import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "@/app/globals.css";
import { NavBar } from "@/components/header/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionHydrator } from "@/app/auth/callback/SessionHydrator";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { getServerUser } from "@/utils/supabase/sesion";
import { Session } from "@/context/context.sesion";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getServerUser()
  return (
    <html
      lang="es"
      className={`  ${balooFont.variable}`}
      suppressHydrationWarning
    >
      <body className="dark:bg-custom ">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionHydrator user={user as Session | null} />
          <NavBar />
          <main className="w-screen min-h-dvh ">{children}</main>
          <Toaster position="top-center" theme="system" />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
