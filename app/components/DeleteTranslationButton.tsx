"use client";

import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import deleteTranslation from "../actions/deleteTranslation";

function DeleteTranslationButton({ id }: { id: string }) {
  const deleteTranslationAction = deleteTranslation.bind(null, id);

  return (
    <form action={deleteTranslationAction}>
      <Button
        type="submit"
        variant="outline"
        size="icon"
        className="border-red-500 text-red-500 hover:bg-red-400 hover:text-white"
      >
        <Trash2Icon size={16} />
      </Button>
    </form>
  );
}

export default DeleteTranslationButton;
