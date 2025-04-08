import './globals.css'
import { Nunito_Sans } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-nunito-sans',
})

// Define base URL for absolute image paths
const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://www.niko.build' // Replace with your actual production domain
  : 'http://localhost:3000'; // Adjust if your local dev port is different

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Niko Rekhviashvili | Portfolio',
  description: 'Product Manager & Builder. Explore my work, projects, and music.',
  openGraph: {
    title: 'Niko Rekhviashvili | Portfolio',
    description: 'Product Manager & Builder. Explore my work, projects, and music.',
    url: baseUrl,
    siteName: 'Niko Rekhviashvili Portfolio',
    images: [
      {
        url: `/images/officestudio.png`, // Relative path to the image in /public
        width: 980, // Provide image dimensions for better rendering
        height: 980, // You might need to adjust these if they are incorrect
        alt: 'Niko Rekhviashvili Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  // Optional: Add Twitter specific tags if needed
  twitter: {
    card: 'summary_large_image',
    title: 'Niko Rekhviashvili | Portfolio',
    description: 'Product Manager & Builder. Explore my work, projects, and music.',
    // creator: '@yourTwitterHandle', // Add your Twitter handle if you have one
    images: [`${baseUrl}/images/officestudio.png`], // Must be an absolute URL
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunitoSans.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
