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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addProductAction } from "@/actions/products";
import { useFormState } from "react-dom";
import { useEffect, useState, useRef } from "react";
import { addProductScheme } from "@/schemas/ProductSchema";

import SubmitButton from "./SubmitButton";
import { toast } from "sonner";

export function AddProductsDialog() {
  const [open, setOpen] = useState(false);

  const [state, action] = useFormState(addProductAction, {
    message: "",
  });
  const form = useForm<z.infer<typeof addProductScheme>>({
    resolver: zodResolver(addProductScheme),
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
        <Button>Add product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new product</DialogTitle>
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
                toast.success(state.message);
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
