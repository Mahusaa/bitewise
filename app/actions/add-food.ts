"use server"

import { meals } from "@/server/db/schema";
import { db } from "@/server/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidateTag } from "next/cache";

export interface ActionResponse {
  success: boolean;
  message: string;
}


export const addFoodFromScan = async (
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> => {
  try {
    const data = formData.get("cal") as string;
    console.log(data)
    const fields = ["name", "cal", "carbs", "protein", "fat", "sugar", "categories"] as const;

    const [name, cal, carbs, protein, fat, sugar, categories] = fields.map(
      (key) => formData.get(key) as string
    );
    const session = await auth.api.getSession({
      headers: await headers()
    });
    const userId = session?.user?.id;
    if (!userId) {
      throw new Error("Profile not found")
    }
    console.log(name, cal, carbs, protein, fat, sugar, categories)

    await db.insert(meals).values({
      userId,
      name,
      categories,
      calories: cal,
      protein: protein,
      carbs: carbs,
      fat: fat,
      sugar: sugar,
    });

    revalidateTag("dashboard-data")

    return {
      success: true,
      message: "Succesfully added food",
    };
  } catch (err) {
    console.error("❌ Error extracting resume:", err);
    return {
      success: false,
      message: "Failed to extract data from food.",
    };
  }
};
