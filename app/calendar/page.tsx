"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { ArrowLeft } from "lucide-react"
import { DailyNutritionProgress } from "@/components/daily-nutrition-progress"
import { MealList } from "@/components/meal-list"
import { dummyFoodEntries } from "@/lib/dummy-data"
import { calculateNutritionGoals } from "@/lib/nutrition-calculator"
import { BottomNavbar } from "@/components/bottom-navbar"

export default function CalendarPage() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Get profile from cookies (simplified for demo)
  const getProfile = () => {
    try {
      const profileCookie = document.cookie.split("; ").find((row) => row.startsWith("user-profile="))

      if (!profileCookie) return null
      return JSON.parse(profileCookie.split("=")[1])
    } catch (error) {
      console.error("Error parsing profile:", error)
      return null
    }
  }

  const profile = getProfile()
  const nutritionGoals = profile ? calculateNutritionGoals(profile) : null

  // In a real app, we would fetch entries for the selected date
  // For demo purposes, we'll just use the dummy data
  const entries = dummyFoodEntries

  const totals = entries.reduce(
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

  return (
    <div className="container max-w-md mx-auto px-4 py-6 pb-20">
      <header className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold ml-2">Nutrition Calendar</h1>
      </header>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <CalendarComponent mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
        </CardContent>
      </Card>

      {date && nutritionGoals && (
        <>
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
              </CardTitle>
              <CardDescription>Nutrition summary</CardDescription>
            </CardHeader>
            <CardContent>
              <DailyNutritionProgress nutritionGoals={nutritionGoals} todayTotals={totals} />
            </CardContent>
          </Card>

          <h2 className="text-lg font-medium mb-4">Meals</h2>
          <MealList entries={entries} />
        </>
      )}

      <BottomNavbar />
    </div>
  )
}

