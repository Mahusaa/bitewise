import type { FoodEntry } from "./types"
import { dummyFoodEntries } from "./dummy-data"

// Helper to get a unique ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

const getTodayKey = () => {
  const today = new Date()
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(
    2,
    "0",
  )}`
}

// Initialize with dummy data if no data exists
const initializeStore = () => {
  if (typeof window === "undefined") return

  const todayKey = getTodayKey()
  const existingData = localStorage.getItem(`meals-${todayKey}`)

  if (!existingData) {
    localStorage.setItem(`meals-${todayKey}`, JSON.stringify(dummyFoodEntries))
  }
}

// Get meals for today
export const getTodayMeals = (): FoodEntry[] => {
  if (typeof window === "undefined") return dummyFoodEntries

  initializeStore()
  const todayKey = getTodayKey()
  const data = localStorage.getItem(`meals-${todayKey}`)

  return data ? JSON.parse(data) : dummyFoodEntries
}

// Add a meal to today's log
export const addMeal = (meal: Omit<FoodEntry, "id">): FoodEntry => {
  if (typeof window === "undefined") return { ...meal, id: "dummy-id" } as FoodEntry

  initializeStore()
  const todayKey = getTodayKey()
  const currentMeals = getTodayMeals()

  const newMeal = {
    ...meal,
    id: generateId(),
  }

  const updatedMeals = [...currentMeals, newMeal]
  localStorage.setItem(`meals-${todayKey}`, JSON.stringify(updatedMeals))

  return newMeal
}

// Calculate nutrition totals from meals
export const calculateTotals = (meals: FoodEntry[]) => {
  return meals.reduce(
    (acc, entry) => {
      return {
        calories: acc.calories + entry.calories,
        protein: acc.protein + entry.protein,
        carbs: acc.carbs + entry.carbs,
        fat: acc.fat + entry.fat,
        sugar: acc.sugar + entry.sugar,
      }
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0 },
  )
}

