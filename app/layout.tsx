import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Manual Estoico Revelado | Domine Suas Emoções em 21 Dias",
  description:
    "Transforme sua mente através do Estoicismo e conquiste uma vida de serenidade, propósito e poder interior — mesmo nos momentos mais caóticos.",
  openGraph: {
    title: "Manual Estoico Revelado | Domine Suas Emoções em 21 Dias",
    description:
      "Transforme sua mente através do Estoicismo e conquiste uma vida de serenidade, propósito e poder interior.",
    images: [{ url: "/og-image.jpg" }],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
          <Toaster />

          <script>
  window.pixelId = "682bff3139790ab4dfd8b658";
  var a = document.createElement("script");
  a.setAttribute("async", "");
  a.setAttribute("defer", "");
  a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
  document.head.appendChild(a);
</script>

<script
  src="https://cdn.utmify.com.br/scripts/utms/latest.js"
  data-utmify-prevent-xcod-sck
  data-utmify-prevent-subids
  async
  defer
></script>
        </ThemeProvider>
      </body>
    </html>
  )
}
