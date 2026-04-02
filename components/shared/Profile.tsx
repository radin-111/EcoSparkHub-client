"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

import AppField from "@/components/shared/Form/AppField";
import AppSubmitButton from "@/components/shared/Form/AppSubmitButton";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import Image from "next/image";
import { Upload, User } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  image: z.any().optional(),
});

interface UserProfile {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: string;
  createdAt: string;
  profileStatus: string;
}

const updateProfile = async (payload: z.infer<typeof profileSchema>) => {
  await new Promise((res) => setTimeout(res, 1000));
  return { success: true };
};

export default function Profile({ user }: { user: UserProfile }) {
  const [preview, setPreview] = useState<string | null>(user.image);
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProfile,
  });

  const form = useForm({
    defaultValues: {
      name: user.name,
      image: undefined as File | undefined,
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      const toastId = toast.loading("Updating profile...");

      try {
        await mutateAsync(value);
        toast.success("Profile updated", { id: toastId });
      } catch {
        setServerError("Something went wrong");
        toast.error("Update failed", { id: toastId });
      }
    },
  });

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {/* 🔹 Header */}
      <div>
        <h2 className="text-2xl font-semibold">Profile Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your account information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 🔹 Image */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border">
            {preview ? (
              <Image
                src={preview}
                alt="profile"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <User className="w-10 h-10 text-muted-foreground" />
              </div>
            )}
          </div>

          <form.Field name="image">
            {(field) => (
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("imageUpload")?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Change Image
                <input
                  id="imageUpload"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.handleChange(file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </Button>
            )}
          </form.Field>
        </div>

        {/* 🔹 Form */}
        <div className="md:col-span-2 space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            {/* ✅ Editable Field */}
            <form.Field
              name="name"
              validators={{ onChange: profileSchema.shape.name }}
            >
              {(field) => <AppField defaultValue={user.name} field={field} label="Full Name" />}
            </form.Field>

            {/* 🔹 Read-only fields (correct way) */}
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input value={user.email} disabled />
            </div>

            <div className="space-y-1.5">
              <Label>Role</Label>
              <Input value={user.role} disabled />
            </div>

            <div className="space-y-1.5">
              <Label>Status</Label>
              <Input value={user.profileStatus} disabled />
            </div>

            <div className="space-y-1.5">
              <Label>Joined At</Label>
              <Input
                value={new Date(user.createdAt).toLocaleDateString()}
                disabled
              />
            </div>

            {serverError && (
              <Alert variant="destructive">
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}

            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                  isPending={isSubmitting || isPending}
                  disabled={!canSubmit}
                >
                  Update Profile
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>
        </div>
      </div>
    </div>
  );
}
