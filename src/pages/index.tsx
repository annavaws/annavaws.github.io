import About from "@/components/modules/HomeModules/about";
import Header from "@/components/modules/HomeModules/header";
import Headerv2 from "@/components/modules/HomeModules/headerv2";
export default function Home() {
  return (
    <>
      <div className="relative z-10">
        <Headerv2/>
        <About />
      </div>
    </>
  );
}
