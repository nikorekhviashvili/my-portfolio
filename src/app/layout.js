import './globals.css'
import { Nunito_Sans } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import ThemeToggle from '../components/theme-toggle'

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
  title: "Niko's personal site",
  description: "My personal website showcasing some cool products I have built and some of my music that I have been not embarrassed to share publicly.",
  openGraph: {
    title: "Niko's personal site",
    description: "My personal website showcasing some cool products I have built and some of my music that I have been not embarrassed to share publicly.",
    url: baseUrl,
    siteName: "Niko's personal site",
    images: [
      {
        url: `/images/officestudio.png`, // Relative path to the image in /public
        width: 980, // Provide image dimensions for better rendering
        height: 980, // You might need to adjust these if they are incorrect
        alt: "Niko's personal site preview",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  // Optional: Add Twitter specific tags if needed
  twitter: {
    card: 'summary_large_image',
    title: "Niko's personal site",
    description: "My personal website showcasing some cool products I have built and some of my music that I have been not embarrassed to share publicly.",
    // creator: '@yourTwitterHandle', // Add your Twitter handle if you have one
    images: [`${baseUrl}/images/officestudio.png`], // Must be an absolute URL
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getTheme() {
                  const stored = localStorage.getItem('theme');
                  if (stored) return stored;
                  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                document.documentElement.setAttribute('data-theme', getTheme());
              })();
            `,
          }}
        />
      </head>
      <body className={nunitoSans.className}>
        <ThemeToggle />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
