import Image from "next/image";
import userLogo from "@/assets/user.jpg";

export default  function Avatar({imageUrl}: {imageUrl: string}) {
  
  return (
    <div>
      <Image
        className="rounded-full"
        src={imageUrl || userLogo}
        alt="Avatar"
        width={40}
        height={40}
      />
    </div>
  );
}
