import About from "@/components/modules/HomeModules/about";
import Header from "@/components/modules/HomeModules/header";
import Latest from "@/components/modules/HomeModules/latestproject";
import CTA from "@/components/modules/HomeModules/cta";

export default function Home() {
  return (
    <>
      <div className="relative z-10">
        <Header />
        <About />
        <Latest />
        <CTA />
      </div>
    </>
  );
}
