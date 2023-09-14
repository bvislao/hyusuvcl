import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title : 'Club Hyundai SUVS '
  ,description:'Aquí encontrarás el listado de todas nuestras salidas realizadas y por realizar'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">

      <body className={inter.className}>
        <Navbar />
        <main>
          
        {children}
        </main>
<Footer />
    
      </body>
    </html>
  )
}