"use client";

import React from "react";
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

export interface myIdeaData {
  id: string;
  name: string;
  imageUrl: string;
  isPaid: false;
}

export default function IdeaTables({
  ideas,
  onEdit,
  onDelete,
}: {
  ideas: myIdeaData[];
  onEdit?: (idea: myIdeaData) => void;
  onDelete?: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {ideas.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                No ideas found
              </TableCell>
            </TableRow>
          ) : (
            ideas.map((idea) => (
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

                <TableCell className="font-medium">{idea.name}</TableCell>

                <TableCell>{idea.isPaid ? "Paid" : "Free"}</TableCell>

                <TableCell className="text-right space-x-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => onEdit?.(idea)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => onDelete?.(idea.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
