"use client";

import { useState } from "react";

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

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  categories: { id: string; name: string }[];
}

export default function EditIdeaDialog({ open, setOpen, categories }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Idea</DialogTitle>
        </DialogHeader>

        <form className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Idea name" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Idea description" />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="categoryId">Category</Label>
            <select
              id="categoryId"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label>Image</Label>
            <div className="rounded-xl border-2 border-dashed p-4 text-center hover:bg-muted">
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  }
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

          {/* Is Paid */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isPaid"
              checked={isPaid}
              onCheckedChange={(val) => setIsPaid(!!val)}
            />
            <Label htmlFor="isPaid">Is Paid</Label>
          </div>

          {/* Price */}
          {isPaid && (
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" placeholder="0.00" />
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1">
              Save as Draft
            </Button>

            <Button className="flex-1">Submit for Review</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
