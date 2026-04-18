"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createAdmin } from "@/Actions/user.action";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import { UserData } from "@/types&enums&interfaces/user.interface";

export default function CreateAdminDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating admin...");

      try {
        const result = (await createAdmin(value)) as any;
        if (result?.success) {
          toast.success("Admin created successfully", {
            id: toastId,
          });
        } 
        form.reset();
      } catch (error) {
        toast.error("Failed to create admin", {
          id: toastId,
        });
      }

      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Admin</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Create Admin</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          {/* Name */}
          <form.Field name="name">
            {(field) => (
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter name"
                />
              </div>
            )}
          </form.Field>

          {/* Email */}
          <form.Field name="email">
            {(field) => (
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter email"
                />
              </div>
            )}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {(field) => (
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter password"
                />
              </div>
            )}
          </form.Field>

          <Button type="submit" className="w-full mt-2">
            Create Admin
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
