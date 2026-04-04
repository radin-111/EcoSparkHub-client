"use server";
import { httpClient } from "@/lib/axios/httpClient";
interface AddCategoryDialog {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}
export const createCategory = async (payload: { name: string; description?: string }) => {
  try{
    const res = await httpClient.post<AddCategoryDialog>(
    "/category/create-category",
    payload,
  );
  return res;
  }catch(err){
    throw err;
  }
};
