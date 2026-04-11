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
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { IdeaData, myIdeaData } from "@/types&enums&interfaces/idea.interface";

import Swal from "sweetalert2";
import { deleteIdea } from "@/Actions/idea.action";
import EditIdeaDialog from "./EditIdeaDialog";

export default function IdeaTables({ ideas }: { ideas: IdeaData[] }) {
  const [open, setOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<IdeaData | null>(null);

  const { mutateAsync: deleteIdeaFn } = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteIdea(id);
      return res;
    },
    onSuccess: () => toast.success("Deleted successfully"),
    onError: () => toast.error("Delete failed"),
  });

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure you want to delete this idea?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting...");
        try {
          const res = await deleteIdeaFn(id);
          if (res.success) {
            toast.success("Deleted successfully", { id: toastId });
          }
        } catch (err) {
          toast.error("Delete failed", { id: toastId });
        }
      }
    });
  };

  const handleEdit = (idea: IdeaData) => {
    setSelectedIdea(idea);
    setOpen(true);
  };

  return (
    <>
      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {ideas.map((idea) => (
              <TableRow key={idea.id}>
                <TableCell>
                  <div className="relative h-12 w-12">
                    <Image
                      src={idea.imageUrl}
                      alt={idea.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </TableCell>

                <TableCell>{idea.name}</TableCell>

                <TableCell>
                  {idea.isPaid ? `Paid ($${idea.price})` : "Free"}
                </TableCell>

                <TableCell>{idea.status}</TableCell>

                <TableCell className="text-right space-x-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleEdit(idea)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => handleDelete(idea.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ✅ reusable dialog */}
      <EditIdeaDialog
        categories={[]}
        initialData={selectedIdea as myIdeaData}

        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
