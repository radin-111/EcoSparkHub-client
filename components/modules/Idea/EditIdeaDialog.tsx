"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";

import AppField from "@/components/shared/Form/AppField";
import AppSubmitButton from "@/components/shared/Form/AppSubmitButton";

import { ideaSchema } from "@/zod/idea.schema";
import { IdeaData } from "@/types&enums&interfaces/idea.interface";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  idea: IdeaData | null;
}

export default function EditIdeaDialog({ open, setOpen, idea }: Props) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: {
      id: string;
      data: z.infer<typeof ideaSchema>;
    }) => {
      return 0;
    },
    onSuccess: () => {
      toast.success("Idea updated");
      setOpen(false);
    },
    onError: () => toast.error("Update failed"),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      isPaid: false,
      imageUrl: "", // ✅ added
    },
    onSubmit: async ({ value }) => {
      if (!idea) return;

      const toastId = toast.loading("Updating...");

      try {
        toast.success("Updated successfully", { id: toastId });
      } catch {
        toast.error("Update failed", { id: toastId });
      }
    },
  });

  useEffect(() => {
    if (idea) {
      form.reset({
        name: idea.name,
        description: idea.description,
        price: idea.price,
        isPaid: idea.isPaid,
        imageUrl: idea.imageUrl, // ✅ added
      });
    }
  }, [idea]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
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
          {/* IMAGE FIELD ✅ */}
          <form.Field name="imageUrl">
            {(field) => (
              <div className="space-y-2">
                <AppField
                  field={field}
                  defaultValue={idea?.imageUrl}
                  label="Image URL"
                />

                {/* preview */}
                {field.state.value && (
                  <img
                    src={field.state.value}
                    alt="preview"
                    className="h-24 w-24 object-cover rounded-md border"
                  />
                )}
              </div>
            )}
          </form.Field>

          {/* NAME */}
          <form.Field
            name="name"
            validators={{ onChange: ideaSchema.shape.name }}
          >
            {(field) => (
              <AppField
                field={field}
                defaultValue={idea?.name}
                label="Name"
              />
            )}
          </form.Field>

          {/* DESCRIPTION */}
          <form.Field
            name="description"
            validators={{ onChange: ideaSchema.shape.description }}
          >
            {(field) => (
              <AppField
                field={field}
                defaultValue={idea?.description}
                label="Description"
              />
            )}
          </form.Field>

          {/* PRICE */}
          <form.Field name="price">
            {(field) => (
              <AppField
                field={field}
                defaultValue={idea?.price?.toString() || "0"}
                label="Price"
                type="number"
              />
            )}
          </form.Field>

          {/* SUBMIT */}
          <form.Subscribe
            selector={(s) => [s.canSubmit, s.isSubmitting] as const}
          >
            {([canSubmit, isSubmitting]) => (
              <AppSubmitButton
                isPending={isSubmitting || isPending}
                disabled={!canSubmit}
              >
                Update Idea
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  );
}