import React from "react"
import { ThemeProvider as NextThemeProvider } from "next-themes"

interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <NextThemeProvider defaultTheme="dark" attribute="class">
      {children}
    </NextThemeProvider>
  )
}

export default ThemeProvider
