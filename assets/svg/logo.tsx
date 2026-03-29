// React Imports

import logo from "@/assets/ecoSparkHubLogo.jpg"
import Image from "next/image";
const LogoImage = () => {
  return (
     <Image
        src={logo}
        alt="Logo"
        width={50}
        height={50}
        className="rounded-full m-0"
      />
  );
};

export default LogoImage;
