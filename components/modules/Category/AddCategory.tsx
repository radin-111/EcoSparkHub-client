"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
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
import { toast } from "sonner";

import { createCategory } from "@/Actions/category.action";

export default function AddCategoryDialog() {
  const [open, setOpen] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: { name: string; description: string }) => {
      if (!payload.name) {
        toast.error("Please enter category name");
        return;
      }
      const data = await createCategory(payload);
      return data;
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Adding category...");
      try {
        const res = await mutateAsync(value);
        if (res?.success) {
          toast.success("Category added successfully");
          toast.dismiss(toastId);
        } else {
          toast.error("Failed to add category");
          toast.dismiss(toastId);
        }
        setOpen(false);
        form.reset();
      } catch (err) {
        toast.error("Failed to add category");
        toast.dismiss(toastId);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Add Category</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
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
              <AppField
                field={field}
                label="Category Name"
                placeholder="Enter category name"
              />
            )}
          </form.Field>

          {/* Description */}
          <form.Field name="description">
            {(field) => (
              <AppField
                field={field}
                label="Description"
                placeholder="Enter description"
              />
            )}
          </form.Field>

          {/* Submit */}
          <form.Subscribe
            selector={(s) => [s.canSubmit, s.isSubmitting] as const}
          >
            {([canSubmit, isSubmitting]) => (
              <AppSubmitButton
                isPending={isSubmitting || isPending}
                disabled={!canSubmit}
              >
                Add Category
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  );
}
