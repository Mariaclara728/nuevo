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
        </ThemeProvider>
      </body>
    </html>
  )
}
