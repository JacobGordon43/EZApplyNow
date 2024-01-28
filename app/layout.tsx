import { ReduxProvider } from '@/redux/provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getFormData } from '@/server-actions/receiveData'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //Redux provider surrounds all children elements to provide them global variables
  return (
    <html lang="en">
      <body className={"bg-white" + inter.className}><ReduxProvider>{children}</ReduxProvider></body>
    </html>
  )
}
