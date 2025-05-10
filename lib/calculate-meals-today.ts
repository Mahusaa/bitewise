import type { NewMealData } from "@/server/db/schema";


interface Totals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar: number;
}

export function calculateMealTotals(meals: NewMealData[]): Totals {
  return meals.reduce<Totals>(
    (acc, meal) => {
      acc.calories += parseFloat(meal.calories);
      acc.protein += parseFloat(meal.protein);
      acc.carbs += parseFloat(meal.carbs);
      acc.fat += parseFloat(meal.fat);
      acc.sugar += parseFloat(meal.sugar);
      return acc;
    },
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      sugar: 0,
    }
  );
}

