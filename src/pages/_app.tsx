import Navbar from "@/components/elements/navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />;
    </div>
  );
}
// import { FaBars, FaTimes } from 'react-icons/fa';
