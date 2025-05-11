
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { FoodScanner } from "@/components/food-scanner"
import Link from "next/link"

export default function AddFoodPage() {
  return (
    <div className="container max-w-md mx-auto px-4 py-6 pb-20">
      <header className="flex items-center mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
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
    </div>
  )
}

