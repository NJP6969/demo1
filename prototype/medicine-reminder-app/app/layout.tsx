import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Medicine Reminder App',
  description: 'Track your medications and appointments',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  )
}
