"use client";
import { toggleAvailibity } from "@/actions/products";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";

const ToggleAvailibityTransition = ({
  id,
  isAvailable,
}: {
  id: string;
  isAvailable: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      disabled={isPending}
      className="justify-between"
      onClick={() => {
        startTransition(async () => {
          await toggleAvailibity(id, !isAvailable);
        });
      }}
    >
      {isAvailable ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  );
};

export default ToggleAvailibityTransition;
