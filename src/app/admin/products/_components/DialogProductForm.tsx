"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addProductAction, editProductAction } from "@/actions/products";
import { useFormState } from "react-dom";
import { useEffect, useState, useRef } from "react";
import { addProductScheme, editSchema } from "@/schemas/ProductSchema";

import SubmitButton from "./SubmitButton";
import { toast } from "sonner";
import { Product } from "@/models/product";

export function DialogProductForm({ product }: { product?: Product | null }) {
  const [open, setOpen] = useState(false);

  const [state, action] = useFormState(
    !product ? addProductAction : editProductAction.bind(null, product.id),
    {
      message: "",
    }
  );
  const schemaType = product ? editSchema : addProductScheme;

  const form = useForm<z.infer<typeof schemaType>>({
    resolver: zodResolver(schemaType),
    defaultValues: {
      imagePath: undefined,
      filePath: undefined,
    },
    reValidateMode: "onChange",
  });
  const fileRef = form.register("filePath");
  const imgRef = form.register("imagePath");

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    form.reset();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button>{product ? "Edit" : "Add a new product"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit product" : "Add new product"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            action={action}
            className="grid gap-4 py-4"
            ref={formRef}
            onSubmit={(evt) => {
              evt.preventDefault();
              form.handleSubmit(() => {
                action(new FormData(formRef.current!));
                toast.success(state.message || "Product created succesfully");
                setOpen(!open);
              })(evt);
            }}
          >
            <div className="flex flex-row gap-5 justify-between">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} id="name" className="col-span-3" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priceInCop"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price in COP</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="priceInCop"
                        type="number"
                        className="col-span-3"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="col-span-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="filePath"
              control={form.control}
              render={() => (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <Input type="file" className="col-span-3" {...fileRef} />
                  </FormControl>
                  <FormDescription>
                    {product !== null && product?.filePath}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="imagePath"
              control={form.control}
              render={() => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input type="file" className="col-span-3" {...imgRef} />
                  </FormControl>
                  <FormDescription>
                    {product !== null && product?.imagePath}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <SubmitButton />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
