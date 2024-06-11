import { z } from "zod";


const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (img) => img.size === 0 || img.type.startsWith("image/")
);

export const addProductScheme = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCop: z.coerce.number().int().min(1),
  filePath: fileSchema.refine((file) => file.size > 0, "Required"),
  imagePath: imageSchema.refine((img) => img.size > 0, "Required"),
});
