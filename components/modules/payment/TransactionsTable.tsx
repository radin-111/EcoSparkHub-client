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
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { fadeInUp, scrollFadeInUp, staggerFadeIn } from "@/lib/animations";

interface Props {
  data: Payment[];
}

export default function TransactionsTable({ data }: Props) {
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableRef.current) {
      scrollFadeInUp(tableRef.current);
    }
  }, []);

  return (
    <motion.div
      ref={tableRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
      className="rounded-2xl border p-4 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <Table>
        <TableHeader>
          <TableRow className="border-b-2 border-gray-200">
            <TableHead className="font-semibold text-gray-900">Payment ID</TableHead>
            <TableHead className="font-semibold text-gray-900">User Email</TableHead>
            <TableHead className="font-semibold text-gray-900">Currency</TableHead>
            <TableHead className="font-semibold text-gray-900">Amount</TableHead>
            <TableHead className="font-semibold text-gray-900">Transaction ID</TableHead>
            <TableHead className="font-semibold text-gray-900">Status</TableHead>
            <TableHead className="font-semibold text-gray-900">Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.05,
                  ease: "easeOut" as const
                }}
              >
                <TableRow className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200">
                  <TableCell className="font-medium text-gray-900">{item.id}</TableCell>
                  <TableCell className="text-gray-700">{item.user.email}</TableCell>
                  <TableCell className="text-gray-700 font-medium">{item.currency}</TableCell>
                  <TableCell className="text-gray-900 font-semibold">
                    ${item.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="truncate max-w-[180px] text-gray-600">
                    {item.transactionId}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(item.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                  No transactions found.
                </TableCell>
              </TableRow>
            </motion.div>
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let variant: "default" | "secondary" | "destructive" = "secondary";
  let colorClass = "bg-gray-100 text-gray-800";

  switch (status) {
    case "PAID":
      variant = "default";
      colorClass = "bg-green-100 text-green-800 border-green-200";
      break;
    case "UNPAID":
      variant = "secondary";
      colorClass = "bg-yellow-100 text-yellow-800 border-yellow-200";
      break;
    case "FAILED":
      variant = "destructive";
      colorClass = "bg-red-100 text-red-800 border-red-200";
      break;
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        duration: 0.3, 
        type: "spring" as const, 
        stiffness: 300,
        damping: 20
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2, ease: "easeOut" as const }
      }}
    >
      <Badge 
        variant={variant} 
        className={`px-3 py-1 font-medium border ${colorClass} shadow-sm`}
      >
        {status}
      </Badge>
    </motion.div>
  );
}
