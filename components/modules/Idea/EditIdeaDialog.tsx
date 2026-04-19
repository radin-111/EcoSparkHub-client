"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";
import Image from "next/image";

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
import { Textarea } from "@/components/ui/textarea";

import { CategoryData } from "@/types&enums&interfaces/category.interface";
import { myIdeaData } from "@/types&enums&interfaces/idea.interface";
import { ideaSchema } from "@/zod/idea.schema";
import { updateIdea } from "@/Actions/idea.action";

type EditIdeaProps = {
  categories: CategoryData[];
  initialData: myIdeaData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EditIdeaForm({
  categories,
  initialData,
  open,
  onOpenChange,
}: EditIdeaProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: FormData) =>
      await updateIdea(initialData.id, payload),
  });

  const form = useForm({
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      image: null as File | null,
      isPaid: initialData?.isPaid || false,
      price: initialData?.price ? String(initialData.price) : "0",
      status: initialData?.status,
      categoryId: initialData?.categoryId || "",
    },

    onSubmit: async ({ value }) => {
      const parsed = ideaSchema.safeParse(value);

      if (!parsed.success) {
        const msg = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
        toast.error(msg || "Validation failed");
        return;
      }

      if (value.isPaid && (!value.price || Number(value.price) <= 0)) {
        toast.error("Price must be greater than 0");
        return;
      }

      await handleUpdate(value);
    },
  });

  useEffect(() => {
    if (!open || !initialData) return;

    form.reset({
      name: initialData.name,
      description: initialData.description,
      image: null,
      isPaid: initialData.isPaid,
      price: initialData.price ? String(initialData.price) : "",
      status: initialData.status,
      categoryId: initialData.categoryId,
    });

    setPreview(initialData.imageUrl ?? null);
  }, [open, initialData]);

  const handleUpdate = async (value: typeof form.state.values) => {
    const formData = new FormData();

    if (value.image) {
      formData.append("file", value.image);
    }

    const payload = {
      id: initialData.id,
      name: value.name,
      description: value.description,
      isPaid: value.isPaid,
      price: value.isPaid ? Number(value.price) : null,
      status: value.status,
      categoryId: value.categoryId,
    };

    formData.append("data", JSON.stringify(payload));

    const toastId = toast.loading("Updating idea...");

    try {
      const result = await mutateAsync(formData);

      if (result.success) {
        toast.success("Idea updated successfully", { id: toastId });
        onOpenChange(false);
      } else {
        toast.error(result.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Update failed", { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Idea</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {/* NAME */}
          <form.Field
            name="name"
            validators={{ onChange: ideaSchema.shape.name }}
          >
            {(field) => (
              <AppField
                defaultValue={initialData?.name ?? ""}
                field={field}
                label="Name"
                placeholder="Idea name"
              />
            )}
          </form.Field>

          {/* DESCRIPTION */}
          <form.Field
            name="description"
            validators={{ onChange: ideaSchema.shape.description }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          {/* CATEGORY */}
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
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </form.Field>

          {/* IMAGE */}
          <form.Field name="image">
            {(field) => (
              <div className="space-y-2">
                <Label>Image</Label>

                <input
                  type="file"
                  className="hidden"
                  id="editImg"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    field.handleChange(file);

                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />

                <label htmlFor="editImg" className="cursor-pointer block">
                  {preview ? (
                    <Image
                      src={preview}
                      alt="preview"
                      width={140}
                      height={140}
                      className="rounded-lg object-cover"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Upload image
                    </p>
                  )}
                </label>
              </div>
            )}
          </form.Field>

          {/* IS PAID */}
          <form.Field name="isPaid">
            {(field) => (
              <div className="flex items-center gap-2">
                <Checkbox
                  defaultChecked={initialData.price.toString() ? true : false}
                  checked={field.state.value}
                  onChange={(e) => {
                    field.handleChange(
                      !!(e.target as HTMLInputElement).checked
                    );
                  }}
                  onCheckedChange={(v) => field.handleChange(!!v)}
                />
                <Label>Is Paid</Label>
              </div>
            )}
          </form.Field>

          {/* PRICE */}
          <form.Subscribe selector={(s) => s.values.isPaid}>
            {(isPaid) =>
              isPaid && (
                <form.Field
                  name="price"
                  validators={{
                    onChange: z.string().min(1, "Price required"),
                  }}
                >
                  {(field) => (
                    <AppField
                      field={field}
                      label="Price"
                      type="number"
                      defaultValue={initialData?.price?.toString() || ""}
                      placeholder="Enter price"
                    />
                  )}
                </form.Field>
              )
            }
          </form.Subscribe>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
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
                  Save
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
