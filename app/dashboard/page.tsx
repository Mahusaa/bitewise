"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Utensils } from "lucide-react"
import { calculateNutritionGoals } from "@/lib/nutrition-calculator"
import type { NutritionGoals, UserProfile, FoodEntry } from "@/lib/types"
import { DailyNutritionProgress } from "@/components/daily-nutrition-progress"
import { BottomNavbar } from "@/components/bottom-navbar"
import { MealsDrawer } from "@/components/meals-drawer"
import { Button } from "@/components/ui/button"
import { getTodayMeals, calculateTotals } from "@/lib/meal-store"

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [nutritionGoals, setNutritionGoals] = useState<NutritionGoals | null>(null)
  const [todayEntries, setTodayEntries] = useState<FoodEntry[]>([])
  const [todayTotals, setTodayTotals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    sugar: 0,
  })

  // Function to refresh meals data
  const refreshMeals = () => {
    const meals = getTodayMeals()
    setTodayEntries(meals)
    setTodayTotals(calculateTotals(meals))
  }

  useEffect(() => {
    // Get profile from cookies
    const profileCookie = document.cookie.split("; ").find((row) => row.startsWith("user-profile="))

    if (!profileCookie) {
      router.push("/onboarding")
      return
    }

    try {
      const profileData = JSON.parse(profileCookie.split("=")[1])
      setProfile(profileData)

      // Calculate nutrition goals based on profile
      const goals = calculateNutritionGoals(profileData)
      setNutritionGoals(goals)

      // Load today's food entries
      refreshMeals()

      // Set up an interval to refresh meals data (simulating real-time updates)
      const intervalId = setInterval(refreshMeals, 2000)

      return () => clearInterval(intervalId)
    } catch (error) {
      console.error("Error parsing profile:", error)
      router.push("/onboarding")
    }
  }, [router])

  if (!profile || !nutritionGoals) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-6 pb-20">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Utensils className="h-6 w-6 text-green-500 mr-2" />
          <h1 className="text-xl font-bold">NutriTrack</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={() => router.push("/settings")}>
          <Settings className="h-5 w-5" />
        </Button>
      </header>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Daily Goals</CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DailyNutritionProgress nutritionGoals={nutritionGoals} todayTotals={todayTotals} />
            </CardContent>
          </Card>

          <MealsDrawer entries={todayEntries} />
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Nutrition Calendar</CardTitle>
              <CardDescription>View your nutrition history</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center py-10">
              <div className="text-center">
                <Button className="mt-4" variant="outline" onClick={() => router.push("/calendar")}>
                  Open Calendar View
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <BottomNavbar />
    </div>
  )
}

