"use server";
import { httpClient } from "@/lib/axios/httpClient";
import {
  AddCategoryDialog,
  CategoryData,
} from "@/types&enums&interfaces/category.interface";
import { revalidatePath } from "next/cache";

export const createCategory = async (payload: {
  name: string;
  description?: string;
}) => {
  try {
    const res = await httpClient.post<AddCategoryDialog>(
      "/category/create-category",
      payload,
    );
    revalidatePath("/admin/categories");
    return res;
  } catch (err) {
    throw err;
  }
};
export const updateCategory = async (payload: CategoryData) => {
  try {
    const res = await httpClient.patch<AddCategoryDialog>(
      `/category/${payload.id}`,
      {
        name: payload.name,
        description: payload.description,
      },
    );
    revalidatePath("/admin/categories");
    return res;
  } catch (err) {
    throw err;
  }
};
