import type { Metadata } from "next"
import { Fraunces, Geist, Geist_Mono } from "next/font/google"

import { AppShell } from "@/components/layout/app-shell"
import { AppProviders } from "@/app/providers"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Harbor",
    template: "%s · Harbor",
  },
  description: "People directory for the Harbor team.",
}

/**
 * Root layout.
 * Providers stay outside the shell so toasts and the query cache are available
 * on every route, including the error and not-found pages.
 * `suppressHydrationWarning` is only on `<html>` because the theme provider
 * sets that element's class before React hydrates.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  )
}
