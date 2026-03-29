
import { cn } from "@/lib/utils";
import LogoImage from "@/assets/svg/logo";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoImage />
     
      {/* <span className="text-xl font-semibold">EcoSparkHub</span> */}
    </div>
  );
};

export default Logo;
