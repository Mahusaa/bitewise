
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Utensils } from "lucide-react"
import { calculateNutritionGoals } from "@/lib/nutrition-calculator"
import { DailyNutritionProgress } from "@/components/daily-nutrition-progress"
import { BottomNavbar } from "@/components/bottom-navbar"
import { MealsDrawer } from "@/components/meals-drawer"
import { Button } from "@/components/ui/button"
import { getTodayMeals } from "@/server/db/queries"
import { getProfile } from "@/server/db/queries"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { calculateMealTotals } from "@/lib/calculate-meals-today"

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("Profile not found")
  }
  const meals = await getTodayMeals(userId);
  const mealsToday = calculateMealTotals(meals)

  const profile = await getProfile(userId);
  if (!profile) {
    throw new Error("Profile not found")
  }
  const nutritionGoals = calculateNutritionGoals(profile)

  return (
    <div className="container max-w-md mx-auto px-4 py-6 pb-20">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Utensils className="h-6 w-6 text-green-500 mr-2" />
          <h1 className="text-xl font-bold">BiteWise</h1>
        </div>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </header>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Daily Goals</CardTitle>
          <CardDescription>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DailyNutritionProgress nutritionGoals={nutritionGoals} todayTotals={mealsToday} />
        </CardContent>
      </Card>
      <MealsDrawer entries={meals} />
      <BottomNavbar />
    </div>
  )
}

