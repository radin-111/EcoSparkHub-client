"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AppField from "@/components/shared/Form/AppField";
import AppSubmitButton from "@/components/shared/Form/AppSubmitButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function AddIdeaForm() {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: FormData) => {
      console.log("Submitted FormData:");
      for (const [key, value] of payload.entries()) {
        console.log(key, value);
      }
      return payload;
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      image: null as File | null,
      isPaid: false,
      price: "",
      status: "DRAFT",
    },
    onSubmit: async ({ value }) => {
      await handleSubmit(value, "PUBLISHED");
    },
  });

  // 🔥 shared submit handler
  const handleSubmit = async (
    value: typeof form.state.values,
    status: "DRAFT" | "PUBLISHED",
  ) => {
    const formData = new FormData();

    // 🔥 append file separately
    if (value.image) {
      formData.append("file", value.image);
    }

    // 🔥 rest of data as JSON
    const data = {
      name: value.name,
      description: value.description,
      isPaid: value.isPaid,
      price: value.isPaid ? value.price : null,
      status,
    };

    formData.append("data", JSON.stringify(data));

    await mutateAsync(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Idea</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Idea</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {/* Name */}
          <form.Field name="name">
            {(field) => (
              <AppField field={field} label="Name" placeholder="Idea name" />
            )}
          </form.Field>

          {/* Description */}
          <form.Field name="description">
            {(field) => (
              <AppField
                field={field}
                label="Description"
                placeholder="Idea description"
              />
            )}
          </form.Field>

          {/* 🔥 Image Upload (Styled + Preview) */}
          <form.Field name="image">
            {(field) => (
              <div className="space-y-2">
                <Label>Image</Label>

                <div className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:bg-muted transition">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="imageUpload"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      field.handleChange(file);

                      if (file) {
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />

                  <label htmlFor="imageUpload" className="cursor-pointer">
                    {preview ? (
                      <img
                        src={preview}
                        alt="preview"
                        className="mx-auto h-32 object-cover rounded-lg"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag & drop
                      </p>
                    )}
                  </label>
                </div>
              </div>
            )}
          </form.Field>

          {/* isPaid */}
          <form.Field name="isPaid">
            {(field) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={field.state.value}
                  onCheckedChange={(val) => field.handleChange(!!val)}
                />
                <Label>Is Paid</Label>
              </div>
            )}
          </form.Field>

          {/* Price */}
          <form.Subscribe selector={(s) => s.values.isPaid}>
            {(isPaid) =>
              isPaid && (
                <form.Field name="price">
                  {(field) => (
                    <AppField
                      field={field}
                      label="Price"
                      placeholder="Enter price"
                      type="number"
                    />
                  )}
                </form.Field>
              )
            }
          </form.Subscribe>

          {/* 🔥 Actions */}
          <div className="flex gap-3 pt-2">
            {/* Save as Draft */}
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => handleSubmit(form.state.values, "DRAFT")}
              disabled={isPending}
            >
              Save as Draft
            </Button>

            {/* Publish */}
            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                  className="flex-1"
                  isPending={isSubmitting || isPending}
                  disabled={!canSubmit}
                >
                  Publish
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
