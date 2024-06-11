"use server";

import { addProductScheme } from "@/schemas/ProductSchema";
import { z } from "zod";
import fs from "fs/promises";

export const addProductAction = async (
  data: z.infer<typeof addProductScheme>
) => {
  await fs.mkdir("products", { recursive: true });
  const filePath = `products/${crypto.randomUUID()}-${
    data.filePath.arrayBuffer
  }`;
  await fs.writeFile(filePath, Buffer.from(await data.filePath.arrayBuffer()));

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${
    data.filePath.arrayBuffer
  }`;
  await fs.writeFile(
    `${filePath}`,
    Buffer.from(await data.filePath.arrayBuffer())
  );
  const parsed = addProductScheme.safeParse(data);

  if (parsed.success) {
    console.log("success");
    return { message: "Producto creado" };
  } else {
    console.log("error");
    return {
      message: "Error al crear el producto",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }
};
