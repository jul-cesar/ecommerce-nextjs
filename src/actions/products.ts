"use server";

import prisma from "@/db/db";
import fs from "fs/promises";
import crypto from "crypto";
import { addProductScheme } from "@/schemas/ProductSchema";
import { z } from "zod";
import { revalidatePath } from "next/cache";

type prevStateType = {
  message: string;
};

const ProductSchemeServer = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCop: z.coerce.number().int().min(1),
  filePath: z
    .custom<File>((val) => val instanceof File, "Required")
    .refine((files) => files.size > 0, "Required"),
  imagePath: z
    .custom<File>((val) => val instanceof File, "Required")
    .refine((file) => file.type.startsWith("image/")),
});

export const addProductAction = async (
  prevState: prevStateType,
  data: FormData
) => {
  console.log(data);
  const result = ProductSchemeServer.safeParse(
    Object.fromEntries(data.entries())
  );
  if (!result.success) {
    return { message: "There was an error creating the product" };
  }

  const dataProduct = result.data;

  await fs.mkdir("products", { recursive: true });

  const file = data.get("filePath") as File;

  if (!file) {
    throw new Error("No file found in the FormData");
  }

  const fileName = `${crypto.randomUUID()}-${file.name}`;
  const filePath = `products/${fileName}`;

  const arrayBuffer = await file.arrayBuffer();

  await fs.writeFile(filePath, Buffer.from(arrayBuffer));

  await fs.mkdir("images", { recursive: true });

  const fileImg = data.get("imagePath") as File;

  if (!fileImg) {
    throw new Error("No image file found in the FormData");
  }

  const imgName = `${crypto.randomUUID()}-${fileImg.name}`;
  const imagePath = `images/${imgName}`;

  const arrayBufferImg = await fileImg.arrayBuffer();

  await fs.writeFile(imagePath, Buffer.from(arrayBufferImg));

  await prisma.product.create({
    data: {
      ...dataProduct,
      imagePath,
      filePath,
      isAvailableToBuy: false,
    },
  });
  revalidatePath("/admin/products", "page");

  return { message: "Product created succesfully" };
};
