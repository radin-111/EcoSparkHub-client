"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AppSubmitButton from "@/components/shared/Form/AppSubmitButton";
import AppField from "@/components/shared/Form/AppField";

import { registerSchema } from "@/zod/auth.schema";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import {  setVerifyEmailCookie, signup } from "@/Actions/auth.action";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import { ILoginResponse } from "@/types&enums&interfaces/auth.types";

// 👉 IMPORTANT: implement this in your actions

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: z.infer<typeof registerSchema>) => signup(payload),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);

      const toastId = toast.loading("Creating account...");

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = (await mutateAsync(
          value,
        )) as ApiResponse<ILoginResponse>;

        if (!result.data.user.emailVerified) {
          const res = await setVerifyEmailCookie(value.email);
          if (res.success) {
            router.push("/verify-email");
            return;
          }
        }

        if (!result?.data?.accessToken) {
          toast.error("Signup failed", { id: toastId });
          setServerError(result?.message || "Signup failed");
          return;
        }

        toast.success("Account created successfully", { id: toastId });

        router.push("/");
      } catch (error) {
        setServerError("An unexpected error occurred. Please try again.");
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <div className={className}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        noValidate
        className="space-y-4"
      >
        {/* Name */}
        <form.Field
          name="name"
          validators={{ onChange: registerSchema.shape.name }}
        >
          {(field) => (
            <AppField
              field={field}
              label="Name"
              type="text"
              placeholder="Enter your name"
              className="w-full"
            />
          )}
        </form.Field>

        {/* Email */}
        <form.Field
          name="email"
          validators={{ onChange: registerSchema.shape.email }}
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

        {/* Password */}
        <form.Field
          name="password"
          validators={{ onChange: registerSchema.shape.password }}
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
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </Button>
              }
            />
          )}
        </form.Field>

        {/* Error */}
        {serverError && (
          <Alert variant="destructive">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        {/* Submit */}
        <form.Subscribe
          selector={(s) => [s.canSubmit, s.isSubmitting] as const}
        >
          {([canSubmit, isSubmitting]) => (
            <AppSubmitButton
              isPending={isSubmitting || isPending}
              pendingLabel="Creating account..."
              disabled={!canSubmit}
            >
              Sign Up
            </AppSubmitButton>
          )}
        </form.Subscribe>

        {/* Redirect */}
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline underline-offset-4"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
