import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast ,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Club Hyundai SUVS ",
  description:
    "Aquí encontrarás el listado de todas nuestras salidas realizadas y por realizar",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main>{children}</main>
        <ToastContainer />
        <Footer />
      </body>
    </html>
  );
}
