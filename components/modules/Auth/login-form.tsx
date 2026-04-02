"use client";
import { useMutation } from "@tanstack/react-query";
import AppField from "@/components/shared/Form/AppField";
import AppSubmitButton from "@/components/shared/Form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/zod/auth.schema";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import z from "zod";
import Link from "next/link";
import { loginWithEmailAndPassword } from "@/Actions/auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: z.infer<typeof loginSchema>) =>
      loginWithEmailAndPassword(payload),
  });
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);

      const toastId = toast.loading("Logging in...");
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = (await mutateAsync(value)) as any;

        if (!result.accessToken) {
          toast.error("Invalid Credentials", { id: toastId });
          setServerError(result.message || "Login failed");
          return;
        }
        toast.success("Login successful", { id: toastId });

        toast.dismiss(toastId);

        router.push("/dashboard");
      } catch (error) {
        setServerError("An unexpected error occurred. Please try again.");
        toast.error("Some error occurred", { id: toastId });
      }
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        noValidate
        className="space-y-4"
      >
        <form.Field
          name="email"
          validators={{ onChange: loginSchema.shape.email }}
        >
          {(field) => (
            <AppField
              field={field}
              label="Email"
              type="email"
              placeholder="Enter your email"
              className="w-full"
            />
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{ onChange: loginSchema.shape.password }}
        >
          {(field) => (
            <AppField
              field={field}
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              append={
                <Button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  variant="ghost"
                  size="icon"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" aria-hidden="true" />
                  ) : (
                    <Eye className="size-4" aria-hidden="true" />
                  )}
                </Button>
              }
            />
          )}
        </form.Field>
        <div className="text-right mt-2">
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:underline underline-offset-4"
          >
            Forgot password?
          </Link>
        </div>

        {serverError && (
          <Alert variant={"destructive"}>
            <AlertDescription>Login failed</AlertDescription>
          </Alert>
        )}

        <form.Subscribe
          selector={(s) => [s.canSubmit, s.isSubmitting] as const}
        >
          {([canSubmit, isSubmitting]) => (
            <AppSubmitButton
              isPending={isSubmitting || isPending}
              pendingLabel="Logging In...."
              disabled={!canSubmit}
            >
              Log In
            </AppSubmitButton>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
