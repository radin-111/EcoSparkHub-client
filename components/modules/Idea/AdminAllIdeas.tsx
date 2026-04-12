"use client";

import { useState } from "react";
import { IdeaData } from "@/types&enums&interfaces/idea.interface";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

import IdeaDetailsDialog from "./IdeaDetailsDialog";

type Props = {
  data: IdeaData[];
};

export default function AdminAllIdeas({ data }: Props) {
  const [selectedIdea, setSelectedIdea] = useState<IdeaData | null>(null);
  const [open, setOpen] = useState(false);

  const handleView = (idea: IdeaData) => {
    setSelectedIdea(idea);
    setOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Votes</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.length ? (
              data.map((idea) => (
                <TableRow key={idea.id}>
                  <TableCell className="font-medium">
                    {idea.name || "Untitled"}
                  </TableCell>

                  <TableCell>{idea.status}</TableCell>

                  <TableCell>
                    {idea.isPaid ? `$${idea.price}` : "Free"}
                  </TableCell>

                  <TableCell>
                    👍 {idea.up_vote} / 👎 {idea.down_vote}
                  </TableCell>

                  <TableCell>
                    {idea.createdAt
                      ? new Date(idea.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleView(idea)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No ideas found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog */}
      <IdeaDetailsDialog
        idea={selectedIdea}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
}
