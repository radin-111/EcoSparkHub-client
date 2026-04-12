"use client";

import { useState } from "react";
import { IdeaData } from "@/types&enums&interfaces/idea.interface";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import IdeaDetailsDialog from "./IdeaDetailsDialog";
import Image from "next/image";

import { Eye } from "lucide-react"; // ✅ icon

export default function ApproveAndRejectTable({ data }: { data: IdeaData[] }) {
  const [selectedIdea, setSelectedIdea] = useState<IdeaData | null>(null);
  const [open, setOpen] = useState(false);

  const handleView = (idea: IdeaData) => {
    setSelectedIdea(idea);
    setOpen(true);
  };

  const handleApprove = (ideaId: string) => {
    console.log("Approved:", ideaId);
  };

  const handleReject = (ideaId: string) => {
    console.log("Rejected:", ideaId);
  };

  return (
    <>
      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Idea</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Votes</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((idea) => (
              <TableRow key={idea.id}>
                {/* IDEA */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={idea.imageUrl || "/placeholder.png"}
                      alt={idea.name}
                      width={60}
                      height={40}
                      className="rounded object-cover"
                    />
                    <span className="font-medium">{idea.name}</span>
                  </div>
                </TableCell>

                {/* STATUS */}
                <TableCell>{idea.status}</TableCell>

                {/* PRICE */}
                <TableCell>{idea.isPaid ? `$${idea.price}` : "Free"}</TableCell>

                {/* VOTES */}
                <TableCell>
                  👍 {idea.up_vote} / 👎 {idea.down_vote}
                </TableCell>

                {/* CREATED */}
                <TableCell>
                  {new Date(idea.createdAt).toLocaleDateString()}
                </TableCell>

                {/* ACTIONS */}
                <TableCell>
                  <div className="flex justify-end gap-2">
                    {/* 👁 View Icon Button */}
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleView(idea)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>

                    {/* ✅ Approve */}
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleApprove(idea.id)}
                    >
                      Approve
                    </Button>

                    {/* ❌ Reject */}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(idea.id)}
                    >
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* DIALOG */}
      <IdeaDetailsDialog
        open={open}
        onOpenChange={setOpen}
        idea={selectedIdea}
      />
    </>
  );
}
