"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AppField from "@/components/shared/Form/AppField";
import AppSubmitButton from "@/components/shared/Form/AppSubmitButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { CategoryData } from "@/types&enums&interfaces/category.interface";
import { ideaSchema } from "@/zod/idea.schema";
import { myIdeaData } from "@/types&enums&interfaces/idea.interface";



export default function EditIdeaDialog({
  categories,
  initialData,
  open,
  onOpenChange,
}: {
  categories: CategoryData[];
  initialData: myIdeaData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [preview, setPreview] = useState<string | null>(
    initialData.image || null,
  );

  const form = useForm({
    defaultValues: {
      name: initialData.name || "",
      description: initialData.description || "",
      image: null as File | null,
      isPaid: initialData.isPaid || false,
      price: initialData.price || "",
      status: initialData.status || "DRAFT",
      categoryId: initialData.categoryId || "",
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

      if (value.isPaid && (!value.price || Number(value.price) <= 0)) {
        toast.error("Price must be greater than 0");
        return;
      }

      console.log("Updated Idea Data:", value);

      toast.success("Form submitted (check console)");
      onOpenChange(false); // 👈 close from parent
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Idea</DialogTitle>
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
          <form.Field
            name="name"
            validators={{ onChange: ideaSchema.shape.name }}
          >
            {(field) => (
              <AppField field={field} label="Name" placeholder="Idea name" />
            )}
          </form.Field>

          {/* Description */}
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

          {/* Category */}
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

          {/* Image */}
          <form.Field name="image">
            {(field) => (
              <div className="space-y-2">
                <Label>Image</Label>
                <div className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:bg-muted transition">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="updateImageUpload"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      field.handleChange(file);
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                  <label htmlFor="updateImageUpload">
                    {preview ? (
                      <img
                        src={preview}
                        alt="preview"
                        className="mx-auto h-32 object-cover rounded-lg"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Click to upload
                      </p>
                    )}
                  </label>
                </div>
              </div>
            )}
          </form.Field>

          {/* Paid */}
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

          {/* Submit */}
          <form.Subscribe
            selector={(s) => [s.canSubmit, s.isSubmitting] as const}
          >
            {([canSubmit, isSubmitting]) => (
              <AppSubmitButton isPending={isSubmitting} disabled={!canSubmit}>
                Update
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  );
}
