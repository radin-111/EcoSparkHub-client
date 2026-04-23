import TransactionsTable from "@/components/modules/payment/TransactionsTable";
import Pagination from "@/components/shared/pagination";
import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import { Payment } from "@/types&enums&interfaces/payment.interface";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
export const dynamic = "force-dynamic";
export default async function AllTransactionsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["transactions"],
    queryFn: () => httpClient.get("/payment/all-transactions"),
  });
  const transactions = queryClient.getQueryData([
    "transactions",
  ]) as ApiResponse<Payment[]>;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TransactionsTable data={transactions?.data || []} />
      <Pagination totalPages={Number(transactions?.meta?.totalPages) || 0} />
    </HydrationBoundary>
  );
}
