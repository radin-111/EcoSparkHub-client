"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AppField from "@/components/shared/Form/AppField";
import AppSubmitButton from "@/components/shared/Form/AppSubmitButton";
import { useForm } from "@tanstack/react-form";
import { Edit } from "lucide-react";
import { CategoryData } from "@/types&enums&interfaces/category.interface";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCategory } from "@/Actions/category.action";

interface CategoryTableProps {
  categories: CategoryData[];
}

export default function CategoryTable({ categories }: CategoryTableProps) {
  const [editCategory, setEditCategory] = useState<CategoryData | null>(null);
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useMutation({
    mutationFn: async (data: CategoryData) => {
      return await updateCategory(data);
    },
  });

  const form = useForm({
    defaultValues: {
      id: editCategory?.id || "",
      name: editCategory?.name || "",
      description: editCategory?.description || "",
    },
    onSubmit: async ({ value }) => {
      const updatedData = {
        ...value,
      };
      const toastId = toast.loading("Updating Category...");
      try {
        const res = await mutateAsync(updatedData);
        if (res.success) {
          toast.success("Category updated successfully", { id: toastId });
        }
      } catch (err) {
        toast.error("Failed to update category", { id: toastId });
      }
      setOpen(false);
      setEditCategory(null);
    },
  });

  const handleEditClick = (category: CategoryData) => {
    setEditCategory(category);

    setOpen(true);
  };

  return (
    <div className="overflow-x-auto">
      <Table className="w-full min-w-[600px]">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.description || "-"}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditClick(category)}
                  aria-label="Edit Category"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 🔥 Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <form.Field name="name">
              {(field) => (
                <AppField
                  field={field}
                  label="Name"
                  placeholder="Category Name"
                  defaultValue={editCategory?.name || ""}
                />
              )}
            </form.Field>

            <form.Field name="description">
              {(field) => (
                <AppField
                  field={field}
                  label="Description"
                  placeholder="Category Description"
                  defaultValue={editCategory?.description || ""}
                />
              )}
            </form.Field>

            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton isPending={isSubmitting} disabled={!canSubmit}>
                  Save Changes
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
