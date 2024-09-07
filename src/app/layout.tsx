import '@/app/globals.css'

import type { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import { ThemeProvider } from '@/components/theme-provider'
import { ThemeSwitch } from '@/components/theme-switch'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Tiptap Editor',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(GeistSans.variable, GeistMono.variable)}
      suppressHydrationWarning={true}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <TooltipProvider delayDuration={0}>
            {children}
          </TooltipProvider>
          <ThemeSwitch className="fixed right-2 top-2" />
        </ThemeProvider>
      </body>
    </html>
  )
}
