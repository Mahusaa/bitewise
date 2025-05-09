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

