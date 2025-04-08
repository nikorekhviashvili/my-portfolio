import './globals.css'
import { Nunito_Sans } from 'next/font/google'

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-nunito-sans',
})

export const metadata = {
  title: 'My Portfolio | Your Name',
  description: 'Personal portfolio showcasing my work, projects, music, and blog articles',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunitoSans.className}>{children}</body>
    </html>
  )
}
