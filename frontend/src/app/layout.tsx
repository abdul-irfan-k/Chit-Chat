import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@fortawesome/fontawesome-svg-core/styles.css"
import SessionProviders from "@/provider/session-provider/session-provider"
import { getServerSession } from "next-auth"
import ThemeProvider from "@/provider/theme-provider/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chit Chat",
  description: "Generated by create next app",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // const session = await getServerSession(authOption)
  return (
    <html lang="en">
      <body
        className={`${inter.className}  text-slate-950 fill-slate-950 dark:fill-slate-50 dark:text-slate-50 dark:bg-background-secondary `}
      >
        <ThemeProvider>
          {/* <SessionProviders session={session}>
          </SessionProviders> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
