import banner from "@/assets/banner.png";
import Image from "next/image";

export default function Banner() {
  return <div className="w-full">
<Image src={banner} alt="banner" className="w-full h-auto" />

  </div>;
}
