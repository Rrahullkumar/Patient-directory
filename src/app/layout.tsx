import Header from '@/components/Header'
import './globals.css'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {/* <FilterSection/> */}
        <main className="container mx-auto px-4 py-8 bg-white">
          {children}
        </main>
      </body>
    </html>
  )
}
