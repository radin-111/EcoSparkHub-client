"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

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

import { CategoryData } from "@/types&enums&interfaces/category.interface";
import { IdeaStatus } from "@/types&enums&interfaces/idea.interface";
import { createIdea } from "@/Actions/idea.action";
import { ideaSchema } from "@/zod/idea.schema";




export default function AddIdeaForm({
  categories,
}: {
  categories: CategoryData[];
}) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: FormData) => {
      return await createIdea(payload);
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
      categoryId: "",
    },
    onSubmit: async ({ value }) => {
     
      const parsed = ideaSchema.safeParse(value);

      if (!parsed.success) {
        const firstError = Object.values(
          parsed.error.flatten().fieldErrors,
        )[0]?.[0];
        toast.error(firstError || "Validation failed");
        return;
      }

      // ✅ conditional validation
      if (value.isPaid && (!value.price || Number(value.price) <= 0)) {
        toast.error("Price must be greater than 0");
        return;
      }

      await handleSubmit(value, IdeaStatus.PENDING);
    },
  });

  const handleSubmit = async (
    value: typeof form.state.values,
    status: "DRAFT" | "PENDING",
  ) => {
    const formData = new FormData();

    if (value.image) {
      formData.append("file", value.image);
    }

    const data = {
      name: value.name,
      description: value.description,
      isPaid: value.isPaid,
      price: value.isPaid ? value.price : null,
      status,
      categoryId: value.categoryId,
    };

    formData.append("data", JSON.stringify(data));
    const toastId = toast.loading("Submitting idea...");

    try {
      const res = await mutateAsync(formData);

      if (res?.success) {
        toast.success("Idea submitted successfully", { id: toastId });
        setOpen(false);
        form.reset();
        setPreview(null);
      } else {
        toast.error("Failed to submit idea", { id: toastId });
      }
    } catch (err) {
      toast.error("Failed to submit idea", { id: toastId });
    }
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
          <form.Field
            name="name"
            validators={{ onChange: ideaSchema.shape.name }}
          >
            {(field) => (
              <AppField field={field} label="Name" placeholder="Idea name" />
            )}
          </form.Field>

          <form.Field
            name="description"
            validators={{ onChange: ideaSchema.shape.description }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Description"
                placeholder="Idea description"
              />
            )}
          </form.Field>

          <form.Field
            name="categoryId"
            validators={{ onChange: ideaSchema.shape.categoryId }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label>Category</Label>
                <select
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 bg-background"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </form.Field>

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

          <form.Subscribe selector={(s) => s.values.isPaid}>
            {(isPaid) =>
              isPaid && (
                <form.Field
                  name="price"
                  validators={{
                    onChange: z.string().min(1, "Price is required"),
                  }}
                >
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

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => handleSubmit(form.state.values, "DRAFT")}
              disabled={isPending}
            >
              Save as Draft
            </Button>

            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                  className="flex-1"
                  isPending={isSubmitting || isPending}
                  disabled={!canSubmit}
                >
                  Submit
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
