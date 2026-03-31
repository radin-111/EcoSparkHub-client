import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface AppSubmitButtonProps {
  children: React.ReactNode;
  isPending: boolean;
  pendingLabel?: string;
  className?: string;
  disabled?: boolean;
}

export default function AppSubmitButton({
  children,
  isPending,
  pendingLabel,
  className,
  disabled,
}: AppSubmitButtonProps) {
  return (
    <Button
      disabled={disabled || isPending}
      className={cn("w-full", className)}
      type="submit"
    >
      {isPending && pendingLabel ? (
        <>
          <Loader2 className="animate-spin" aria-hidden="true" />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
