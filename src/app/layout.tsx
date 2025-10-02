import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "@/app/globals.css";
import { NavBar } from "@/components/header/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionHydrator } from "@/components/sesion/SessionHydrator";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { getServerUser } from "@/lib/sesion";
import { UserSchema } from "@/schemas/schema.user";
import { SessionGuard } from "@/components/sesion/SessionGuard";

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
  description:
    "Tudami es una plataforma colaborativa donde aprendices pueden publicar dudas, solicitar tutoría y compartir conocimientos con otros. Aprende preguntando, crece ayudando.",
  metadataBase: new URL("https://tudami.com"),

  openGraph: {
    title: "Tudami - Plataforma colaborativa de aprendizaje",
    description:
      "Tudami conecta a aprendices que necesitan ayuda con quienes desean compartir su conocimiento. Publica dudas, solicita apoyo y participa en una comunidad de aprendizaje.",
    url: "https://tudami.com",
    siteName: "Tudami",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Tudami - Plataforma colaborativa de aprendizaje",
      },
    ],
    locale: "es_CO",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Tudami - Plataforma colaborativa de aprendizaje",
    description:
      "Descubre Tudami: un espacio donde aprendices publican dudas, encuentran tutoría y ayudan a otros. Aprende compartiendo, crece enseñando.",
    creator: "@tudami",
    images: ["/og-image.webp"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  alternates: {
    canonical: "https://tudami.com",
  }
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
          <SessionHydrator user={user as UserSchema | null} />
          <SessionGuard>
            <NavBar />
            <main className="w-screen min-h-dvh ">{children}</main>
            <Toaster position="top-center" theme="system" />
            <Footer />
          </SessionGuard>
        </ThemeProvider>
      </body>
    </html>
  );
}
