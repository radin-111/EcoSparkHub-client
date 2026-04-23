"use client";

import { Payment } from "@/types&enums&interfaces/payment.interface";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Props {
  data: Payment[];
}

export default function TransactionsTable({ data }: Props) {
  return (
    <div className="rounded-2xl border p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Payment ID</TableHead>
            <TableHead>User Email</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.user.email}</TableCell>
                <TableCell>{item.currency}</TableCell>
                <TableCell>{item.amount.toFixed(2)}</TableCell>
                <TableCell className="truncate max-w-[180px]">
                  {item.transactionId}
                </TableCell>
                <TableCell>
                  <StatusBadge status={item.status} />
                </TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                No transactions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let variant: "default" | "secondary" | "destructive" = "secondary";

  switch (status) {
    case "PAID":
      variant = "default"; // green-ish
      break;
    case "UNPAID":
      variant = "secondary"; // gray
      break;
    case "FAILED":
      variant = "destructive"; // red
      break;
  }

  return <Badge variant={variant}>{status}</Badge>;
}
