"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AppSubmitButton from "@/components/shared/Form/AppSubmitButton";

import { ideaSchema } from "@/zod/idea.schema";
import { IdeaData, IdeaStatus } from "@/types&enums&interfaces/idea.interface";
import { CategoryData } from "@/types&enums&interfaces/category.interface";

interface Props {
  idea: IdeaData | null;
  categories: CategoryData[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function EditIdeaDialog({
  idea,
  categories,
  open, 
  setOpen,
}: Props) {
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState<string | null>(idea?.imageUrl ?? null);
  const [file, setFile] = useState<File | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: FormData) => {
      if (!idea) throw new Error("No idea selected");

      const res = await fetch(`/api/ideas/${idea.id}`, {
        method: "PATCH",
        body: payload,
      });

      if (!res.ok) throw new Error("Failed to update idea");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
      toast.success("Idea updated successfully");
      setOpen(false);
    },
    onError: (err) => {
      toast.error( "Failed to update idea");
    },
  });

  const isLoading = isPending;

  const form = useForm({
    defaultValues: {
      name: idea?.name ?? "",
      description: idea?.description ?? "",
      image: null as File | null,
      isPaid: idea?.isPaid ?? false,
      price: idea?.price?.toString() ?? "",
      categoryId: idea?.categoryId ?? "",
    },
    onSubmit: async ({ value }) => {
      await handleProcess(value, IdeaStatus.PENDING);
    },
  });

  const resetWithIdea = () => {
    if (!idea) return;
    form.reset({
      name: idea.name,
      description: idea.description,
      image: null,
      isPaid: idea.isPaid,
      price: idea.price?.toString() ?? "",
      categoryId: idea.categoryId,
    });
    setFile(null);
    setPreview(idea.imageUrl ?? null);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      resetWithIdea();
    } else {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
      setFile(null);
      setPreview(null);
    }
    setOpen(nextOpen);
  };

  const handleProcess = async (
    value: typeof form.state.values,
    status: IdeaStatus,
  ) => {
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

    const formData = new FormData();
    const selectedFile = value.image ?? file;
    if (selectedFile) formData.append("file", selectedFile);

    formData.append(
      "data",
      JSON.stringify({
        name: value.name,
        description: value.description,
        isPaid: value.isPaid,
        price: value.isPaid ? Number(value.price) : null,
        status,
        categoryId: value.categoryId,
      }),
    );

    const toastId = toast.loading("Updating idea...");
    try {
      await mutateAsync(formData);
      toast.dismiss(toastId);
    } catch (err) {
      toast.error("Failed to update idea", { id: toastId });
    }
  };

  useEffect(() => {
    if (!form.state.values.image) return;
    const prev = preview;
    const url = URL.createObjectURL(form.state.values.image);
    setPreview(url);

    return () => {
      URL.revokeObjectURL(url);
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
    };
  }, [form.state.values.image]);

  useEffect(() => {
    if (open) {
      resetWithIdea();
    }
  }, [open, idea, form]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
          {/* Name */}
          <form.Field
            name="name"
            validators={{
              onChange: (val) => {
                const parsed = ideaSchema.shape.name.safeParse(val);
                if (!parsed.success) return parsed.error.errors[0].message;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Idea name"
                />
                {field.state.meta.errors?.length && (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Description */}
          <form.Field
            name="description"
            validators={{
              onChange: (val) => {
                const parsed = ideaSchema.shape.description.safeParse(val);
                if (!parsed.success) return parsed.error.errors[0].message;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Idea description"
                />
                {field.state.meta.errors?.length && (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Category */}
          <form.Field
            name="categoryId"
            validators={{
              onChange: (val) => {
                const parsed = ideaSchema.shape.categoryId.safeParse(val);
                if (!parsed.success) return parsed.error.errors[0].message;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="categoryId">Category</Label>
                <select
                  id="categoryId"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {field.state.meta.errors?.length && (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Image */}
          <form.Field name="image">
            {(field) => (
              <div className="space-y-2">
                <Label>Image</Label>
                <div className="rounded-xl border-2 border-dashed p-4 text-center transition hover:bg-muted">
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const selected = e.target.files?.[0] ?? null;
                      field.handleChange(selected);
                      setFile(selected);
                      if (selected) {
                        if (preview?.startsWith("blob:"))
                          URL.revokeObjectURL(preview);
                        setPreview(URL.createObjectURL(selected));
                      }
                      e.target.value = "";
                    }}
                  />
                  <label htmlFor="imageUpload" className="cursor-pointer block">
                    {preview ? (
                      <img
                        src={preview}
                        alt="preview"
                        className="mx-auto h-32 w-full rounded-lg object-cover"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Click to upload image (optional)
                      </p>
                    )}
                  </label>
                </div>
              </div>
            )}
          </form.Field>

          {/* Is Paid */}
          <form.Field name="isPaid">
            {(field) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPaid"
                  checked={field.state.value}
                  onCheckedChange={(val) => field.handleChange(!!val)}
                />
                <Label htmlFor="isPaid">Is Paid</Label>
              </div>
            )}
          </form.Field>

          {/* Conditional Price */}
          <form.Subscribe selector={(state) => state.values.isPaid}>
            {(isPaid) =>
              isPaid && (
                <form.Field
                  name="price"
                  validators={{
                    onChange: (val) => {
                      if (!val) return "Price is required";
                      if (Number(val) <= 0)
                        return "Price must be greater than 0";
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="0.00"
                      />
                      {field.state.meta.errors?.length && (
                        <p className="text-xs text-destructive">
                          {field.state.meta.errors.join(", ")}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
              )
            }
          </form.Subscribe>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => handleProcess(form.state.values, IdeaStatus.DRAFT)}
              disabled={isLoading}
            >
              Save as Draft
            </Button>

            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                  className="flex-1"
                  isPending={isSubmitting || isLoading}
                  disabled={!canSubmit || isLoading}
                >
                  Submit for Review
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
