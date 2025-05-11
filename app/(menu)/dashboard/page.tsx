
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils, LogOut } from "lucide-react"
import { calculateNutritionGoals } from "@/lib/nutrition-calculator"
import { DailyNutritionProgress } from "@/components/daily-nutrition-progress"
import { MealsDrawer } from "@/components/meals-drawer"
import { Button } from "@/components/ui/button"
import { getTodayMeals } from "@/server/db/queries"
import { getProfile } from "@/server/db/queries"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { calculateMealTotals } from "@/lib/calculate-meals-today"
import Link from "next/link"
import { redirect } from "next/navigation"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

function NutritionCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Daily Goals</CardTitle>
        <CardDescription>
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

async function NutritionData({ userId }: { userId: string }) {
  "use cache"
  cacheTag('dashboard-data');
  const [meals, profile] = await Promise.all([
    getTodayMeals(userId),
    getProfile(userId),
  ]);

  if (!profile) {
    redirect("/onboarding");
  }

  const mealsToday = calculateMealTotals(meals);
  const nutritionGoals = calculateNutritionGoals(profile);

  return (
    <>
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
    </>
  );
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const userId = session?.user?.id;
  if (!userId) {
    redirect("/whoami")
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-6 pb-20">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Utensils className="h-6 w-6 text-green-500 mr-2" />
          <h1 className="text-xl font-bold">BiteWise</h1>
        </div>
        <Link href="/whoami">
          <Button variant="ghost" size="icon">
            <LogOut className="h-5 w-5 text-red-600" />
          </Button>
        </Link>
      </header>

      <Suspense fallback={<NutritionCardSkeleton />}>
        <NutritionData userId={userId} />
      </Suspense>
    </div>
  )
}
