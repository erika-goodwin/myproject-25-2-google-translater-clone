"use server";

import { removeTranslation } from "@/mongodb/models/User";
import { auth } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";

async function deleteTranslation(id: string) {
  auth().protect();

  const { userId } = auth();
  if (!userId) throw new Error("User not found");

  const user = await removeTranslation(userId, id);

  revalidateTag("translationHistory");

  //   return JSON.stringify(user.translations);

  return {
    translations: JSON.stringify(user.translations),
  };
}

export default deleteTranslation;
