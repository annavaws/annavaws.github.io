import { Inter, Lora } from "next/font/google";
import { Albert_Sans, Poppins } from "next/font/google";

// define your variable fonts
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400"],
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400"],
});

const albert = Albert_Sans({
  subsets: ["latin"],
  weight: "400",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400"],
});
export { inter, lora, albert, poppins };
