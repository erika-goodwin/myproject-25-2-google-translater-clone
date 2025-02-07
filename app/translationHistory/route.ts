import { getTranslations } from "@/mongodb/models/User";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  if (!userId) {
    console.error(">>> ERROR: Missing userId in request");
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }

  const translations = await getTranslations(userId!);

  if (!translations || translations.length === 0) {
    console.warn(">>> WARNING: No translations found for userId:", userId);
  }

  return Response.json({ translations });
}
