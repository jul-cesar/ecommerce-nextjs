import { z } from "zod";



export const addProductScheme = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCop: z.coerce.number().int().min(1),
  filePath: z.custom<FileList>((val) => val instanceof FileList, "Required").refine((files)=>files.length > 0, "Required"),
  imagePath: z.custom<FileList>((val) => val instanceof FileList, "Required").refine((file)=> file[0].type.startsWith("image/"))
});
