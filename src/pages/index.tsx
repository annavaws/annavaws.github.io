import About from "@/components/modules/HomeModules/about";
import Header from "@/components/modules/HomeModules/header";
export default function Home() {
  return (
    <>
      <div className="relative z-10">
        <Header />
        <About />
      </div>
    </>
  );
}
