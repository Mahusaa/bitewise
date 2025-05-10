import type { UserProfile, NutritionGoals } from "@/server/db/schema"

export function calculateNutritionGoals(profile: UserProfile): NutritionGoals {
  const age = (profile.age)
  const weight = Number.parseInt(profile.weight)
  const height = Number.parseInt(profile.height)
  const gender = profile.gender
  const activityLevel = profile.activityLevel
  const goal = profile.goal

  let bmr = 0
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161
  }

  let activityMultiplier = 1.2 // sedentary
  switch (activityLevel) {
    case "light":
      activityMultiplier = 1.375
      break
    case "moderate":
      activityMultiplier = 1.55
      break
    case "active":
      activityMultiplier = 1.725
      break
    case "very-active":
      activityMultiplier = 1.9
      break
  }

  let tdee = bmr * activityMultiplier // Total Daily Energy Expenditure

  // Adjust based on goal
  switch (goal) {
    case "weight-loss":
      tdee = tdee * 0.8 // 20% deficit
      break
    case "weight-gain":
      tdee = tdee * 1.15 // 15% surplus
      break
  }

  // Round calories to nearest 50
  const calories = Math.round(tdee / 50) * 50

  // Calculate macronutrients
  // Protein: 1.6g per kg for weight loss, 1.8g for maintenance, 2g for weight gain
  let proteinPerKg = 1.8 // maintenance
  if (goal === "weight-loss") {
    proteinPerKg = 1.6
  } else if (goal === "weight-gain") {
    proteinPerKg = 2.0
  }

  const protein = Math.round(weight * proteinPerKg)

  // Fat: 25-35% of calories
  const fatCalories = calories * 0.3
  const fat = Math.round(fatCalories / 9)

  const proteinCalories = protein * 4
  const carbCalories = calories - proteinCalories - fatCalories
  const carbs = Math.round(carbCalories / 4)

  return {
    calories,
    protein,
    carbs,
    fat,
  }
}

