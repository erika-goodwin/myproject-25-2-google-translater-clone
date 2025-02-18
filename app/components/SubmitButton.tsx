"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={disabled || pending}
      className="bg-blue-500 hover:bg-blue-600 w-full lg:w-fit"
    >
      {pending ? "Translating..." : "Translate"}
    </Button>
  );
}

export default SubmitButton;
