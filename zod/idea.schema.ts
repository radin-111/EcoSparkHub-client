import z from "zod";

export const ideaSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  image: z.instanceof(File).nullable(), 
  isPaid: z.boolean().default(false),
  price: z.string().optional(),
  status: z.string(),
  categoryId: z.string().min(1, "Category is required"),
});