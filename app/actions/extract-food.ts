"use server"

import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { extractMealSchema } from "@/lib/types";

export interface MealData {
  name: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  sugar: string;
}


export interface ActionResponse {
  success: boolean;
  message: string;
  data?: MealData | null;
}


export const extractDataFromFood = async (
  prevState: ActionResponse | null,
  formData: { imageBase64: string }
): Promise<ActionResponse> => {
  try {
    const { imageBase64 } = formData;

    if (!imageBase64) {
      return {
        success: false,
        message: "Image is not get upload",
      };
    }

    const result = await generateObject({
      model: openai("gpt-4.1-nano"),
      system: `You are a food data extraction assistant. Your task is to extract nutritional information from a food-related image. If data doesn't exist, just write "data as 0.`,
      schema: extractMealSchema,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: imageBase64,
            },
          ],
        },
      ],
    });

    const mealData = result.object;


    return {
      success: true,
      message: "Food data extracted successfully.",
      data: mealData,
    };
  } catch (err) {
    console.error("❌ Error extracting resume:", err);
    return {
      success: false,
      message: "Failed to extract data from food.",
    };
  }
};
