import AddCategoryForm from "@/components/modules/Category/AddCategory";
import CategoryTable from "@/components/modules/Category/CategoryTable";
import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import { CategoryData } from "@/types&enums&interfaces/category.interface";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function CategoriesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      await httpClient.get<CategoryData[]>("/category/all-categories"),
  });

  const categories = queryClient.getQueryData(["categories"]) as ApiResponse<
    CategoryData[]
  >;

  

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <AddCategoryForm />
        <CategoryTable categories={categories?.data || []} />
      </div>
    </HydrationBoundary>
  );
}
