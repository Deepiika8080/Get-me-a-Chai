import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import SessionWrapper from "./Components/SessionWrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get Me A Chai",
  description: "chai for chai Lovers...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900`}>
        <SessionWrapper>
          <Header />
          <div className="min-h-screen bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white"> {children}</div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
