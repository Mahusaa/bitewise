import { z } from "zod";


export interface UserProfile {
  age: string
  gender: string
  weight: string
  height: string
  activityLevel: string
  goal: string
}

export interface NutritionGoals {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface FoodEntry {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  sugar: number
  servingSize: string
  mealType: string
  image?: string
}

export const extractMealSchema = z.object({
  name: z.string().max(255).describe("Name of the meal"),
  calories: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/)
    .describe("Total calories, decimal with max 2 digits after decimal in kcal"),
  protein: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/)
    .describe("Protein content in grams"),
  carbs: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/)
    .describe("Carbohydrates in grams"),
  fat: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/)
    .describe("Fat content in grams"),
  sugar: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/)
    .describe("Sugar content in grams"),
})


export const SignUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required"),
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

