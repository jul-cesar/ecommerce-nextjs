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
import { addProductScheme } from "@/schemas/ProductSchema";
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

export function AddProductsDialog() {
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

  const onSubmit = async (data: z.infer<typeof addProductScheme>) => {
    console.log("Form data:", data);

    // Handle file upload if necessary
    // const formData = new FormData();
    // formData.append("file", data.filePath[0]);
    // formData.append("image", data.imagePath[0]);
    // for (const key in data) {
    //   if (key !== "filePath" && key !== "imagePath") {
    //     formData.append(key, data[key]);
    //   }
    // }
    // send formData to your API
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
                    <Input type="file" className="col-span-3"  {...fileRef} />
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
                    <Input type="file" className="col-span-3"  {...imgRef}  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
