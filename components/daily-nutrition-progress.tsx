"use client"

import { Progress } from "@/components/ui/progress"
import type { NutritionGoals } from "@/server/db/schema"

interface DailyNutritionProgressProps {
  nutritionGoals: NutritionGoals
  todayTotals: {
    calories: number
    protein: number
    carbs: number
    fat: number
    sugar: number
  }
}

export function DailyNutritionProgress({ nutritionGoals, todayTotals }: DailyNutritionProgressProps) {
  const calculatePercentage = (current: number, goal: number) => {
    return Math.min(Math.round((current / goal) * 100), 100)
  }

  const caloriesPercentage = calculatePercentage(todayTotals.calories, parseInt(nutritionGoals.calories))
  const proteinPercentage = calculatePercentage(todayTotals.protein, parseInt(nutritionGoals.protein))
  const carbsPercentage = calculatePercentage(todayTotals.carbs, parseInt(nutritionGoals.carbs))
  const fatPercentage = calculatePercentage(todayTotals.fat, parseInt(nutritionGoals.fat))

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Calories</span>
          <span className="font-medium">
            {todayTotals.calories.toFixed(1)} / {nutritionGoals.calories} kcal
          </span>
        </div>
        <Progress value={caloriesPercentage} className="h-2" indicatorClassName="bg-yellow-500" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Protein</span>
          <span className="font-medium">
            {todayTotals.protein.toFixed(1)} / {nutritionGoals.protein} g
          </span>
        </div>
        <Progress value={proteinPercentage} className="h-2" indicatorClassName="bg-green-500" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Carbs</span>
          <span className="font-medium">
            {todayTotals.carbs.toFixed(1)} / {nutritionGoals.carbs} g
          </span>
        </div>
        <Progress value={carbsPercentage} className="h-2" indicatorClassName="bg-blue-500" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Fat</span>
          <span className="font-medium">
            {todayTotals.fat.toFixed(1)} / {nutritionGoals.fat} g
          </span>
        </div>
        <Progress value={fatPercentage} className="h-2" indicatorClassName="bg-rose-500" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Sugar</span>
          <span className="font-medium">{todayTotals.sugar.toFixed(1)} g</span>
        </div>
        <div className="text-xs text-muted-foreground">
          Recommended: Keep sugar intake below {Math.round(parseInt(nutritionGoals.carbs) * 0.1)} g
        </div>
      </div>
    </div>
  )
}

