import Navbar from "@/components/elements/navbar";
import Footer from "@/components/elements/footer";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Transition from "@/components/elements/transition";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navbar />
      <AnimatePresence mode="wait">
        <Transition>
          <Component {...pageProps} />
        </Transition>
        <Footer />
      </AnimatePresence>
    </div>
  );
}
``;
