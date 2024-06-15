"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";
import { LuLoader2 } from "react-icons/lu";

const SubmitButton = () => {
  const form = useFormStatus();

  if (form.pending) {
    return (
      <Button type="submit" className="gap-2">
        {" "}
        <LuLoader2 className=" animate-spin" />
        Loading
      </Button>
    );
  }
  return <Button type="submit">Save</Button>;
};

export default SubmitButton;
