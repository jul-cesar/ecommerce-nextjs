"use client";
import { deleteProduct } from "@/actions/products";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { LuTrash } from "react-icons/lu";

const DeleteProductTransition = ({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      className="justify-between"
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
        });
      }}
    >
      Delete
      <LuTrash />
    </DropdownMenuItem>
  );
};

export default DeleteProductTransition;
