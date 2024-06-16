"use server";

import prisma from "@/db/db";
import fs from "fs/promises";
import crypto from "crypto";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

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

const editSchema = ProductSchemeServer.extend({
  filePath: z
    .custom<File>((val) => val instanceof File, "Required")
    .optional(),
  imagePath: z
    .custom<File>((val) => val instanceof File, "Required")
    .optional(),
});

export const addProductAction = async (
  prevState: prevStateType,
  data: FormData
) => {
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

export const editProductAction = async (
  id: string,

  prevState: prevStateType,
  data: FormData
) => {
  const result = editSchema.safeParse(Object.fromEntries(data.entries()));
  if (!result.success) {
    return { message: "There was an error updating the product" };
  }

  const dataProduct = result.data;
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (product == null) return notFound();

  let filePath = product.filePath;

  if (dataProduct.filePath !== null) {
    await fs.unlink(product?.filePath);
    const file = data.get("filePath") as File;

    const fileName = `${crypto.randomUUID()}-${file.name}`;
    filePath = `products/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();

    await fs.writeFile(filePath, Buffer.from(arrayBuffer));
  }

  let imagePath = product.imagePath;
  if (dataProduct.imagePath !== null) {
    await fs.unlink(product.imagePath);
    const fileImg = data.get("imagePath") as File;

    const imgName = `${crypto.randomUUID()}-${fileImg.name}`;
    imagePath = `images/${imgName}`;

    const arrayBufferImg = await fileImg.arrayBuffer();

    await fs.writeFile(imagePath, Buffer.from(arrayBufferImg));
  }

  await prisma.product.update({
    where: {
      id,
    },
    data: {
      ...dataProduct,
      imagePath,
      filePath,
    },
  });
  revalidatePath("/admin/products", "page");

  return { message: "Product updated succesfully" };
};

export const deleteProduct = async (id: string) => {
  const product = await prisma.product.delete({
    where: {
      id,
    },
  });
  await fs.unlink(product.filePath);
  await fs.unlink(product.imagePath);
  revalidatePath("/admin/products", "page");
};

export const toggleAvailibity = async (id: string, isAvailable: boolean) => {
  await prisma.product.update({
    where: {
      id,
    },
    data: {
      isAvailableToBuy: isAvailable,
    },
  });
  revalidatePath("/admin/products", "page");
};
