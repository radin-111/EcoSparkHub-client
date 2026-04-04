import {
  Avatar as ShadcnAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import userLogo from "@/assets/user.jpg";

export default function Avatar({ imageUrl }: { imageUrl?: string }) {
  return (
    <div className="mr-2">
      <ShadcnAvatar className="h-10 w-10 ">
        <AvatarImage src={imageUrl || userLogo.src} alt="Avatar" />
        <AvatarFallback>U</AvatarFallback>
      </ShadcnAvatar>
    </div>
  );
}
