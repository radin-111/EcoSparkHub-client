"use client";

import { UserData } from "@/types&enums&interfaces/user.interface";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  data: UserData[];
};

export default function AdminUsersTable({ data }: Props) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.length ? (
            data.map((user) => (
              <TableRow key={user.id}>
                {/* User */}
                <TableCell className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user.image || "/placeholder.png"}
                      alt={user.name}
                    />
                    <AvatarFallback>
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <span className="font-medium">{user.name || "Unnamed"}</span>
                </TableCell>

                {/* Email */}
                <TableCell>{user.email || "N/A"}</TableCell>

                {/* Phone */}
                <TableCell>{user.phone || "N/A"}</TableCell>

                {/* Role */}
                <TableCell className="capitalize">{user.role}</TableCell>

                {/* Status */}
                <TableCell>
                  {user.isDeleted ? (
                    <span className="text-red-500 font-medium">Deleted</span>
                  ) : (
                    <span className="text-green-600 font-medium">Active</span>
                  )}
                </TableCell>

                {/* Created */}
                <TableCell>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </TableCell>

                {/* Updated */}
                <TableCell>
                  {user.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString()
                    : "N/A"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
