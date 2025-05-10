"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { FoodScanner } from "@/components/food-scanner"
import { BottomNavbar } from "@/components/bottom-navbar"

export default function AddFoodPage() {
  const router = useRouter()


  return (
    <div className="container max-w-md mx-auto px-4 py-6 pb-20">
      <header className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold ml-2">Add Food</h1>
      </header>


      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Scan Food</CardTitle>
          <CardDescription>Take a photo of your food to identify it</CardDescription>
        </CardHeader>
        <CardContent>
          <FoodScanner />
        </CardContent>
      </Card>

      <BottomNavbar />
    </div>
  )
}

