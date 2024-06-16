import { z } from "zod";

export const addProductScheme = z.object({
  name: z.string({ message: "Enter a valid name" }).min(1),
  description: z
    .string({ message: "Description must have atleast 10 characters" })
    .min(10, { message: "Description must have atleast 10 characters" }),
  priceInCop: z.coerce
    .number({ message: "Enter a valid price" })
    .int()
    .min(1000, { message: "min $1000 COP" }),
  filePath: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, "Required"),
  imagePath: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((file) => file.item(0)?.type.startsWith("image/")),
});

export const editSchema = addProductScheme.extend({
  filePath: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .optional(),
  imagePath: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .optional(),
});
