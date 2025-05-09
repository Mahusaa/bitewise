"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Plus } from "lucide-react"
import { addMeal } from "@/lib/meal-store"
import { toast } from "sonner"

interface FoodItem {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  sugar: number
  servingSize: string
  image?: string
}

interface FoodSearchResultsProps {
  results: FoodItem[]
}

export function FoodSearchResults({ results }: FoodSearchResultsProps) {
  const router = useRouter()
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)
  const [servings, setServings] = useState("1")
  const [mealType, setMealType] = useState("Breakfast")
  const [isAdding, setIsAdding] = useState(false)

  const handleAddFood = () => {
    if (!selectedFood) return

    setIsAdding(true)

    try {
      // Calculate nutrition based on servings
      const servingMultiplier = Number.parseFloat(servings)
      const newMeal = {
        name: selectedFood.name,
        calories: Math.round(selectedFood.calories * servingMultiplier),
        protein: Math.round(selectedFood.protein * servingMultiplier * 10) / 10,
        carbs: Math.round(selectedFood.carbs * servingMultiplier * 10) / 10,
        fat: Math.round(selectedFood.fat * servingMultiplier * 10) / 10,
        sugar: Math.round(selectedFood.sugar * servingMultiplier * 10) / 10,
        servingSize: `${servings} × ${selectedFood.servingSize}`,
        mealType: mealType,
        image: selectedFood.image,
      }

      // Add to meal store
      addMeal(newMeal)

      toast.success("Food added", {
        description: `${selectedFood.name} added to your ${mealType.toLowerCase()}`,
      })

      // Close dialog and redirect
      setSelectedFood(null)
      router.push("/dashboard")
    } catch (error) {
      console.error("Error adding food:", error)
      toast.error("Failed to add food to your log")
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <>
      <div className="space-y-2">
        {results.map((food) => (
          <Card key={food.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center p-2">
                <div className="h-12 w-12 rounded-md overflow-hidden mr-3">
                  <Image
                    src={food.image || "/placeholder.svg?height=48&width=48"}
                    alt={food.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{food.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {food.servingSize} • {food.calories} kcal
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 rounded-full"
                  onClick={() => setSelectedFood(food)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedFood} onOpenChange={(open) => !open && setSelectedFood(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Food</DialogTitle>
            <DialogDescription>Add this food to your daily log</DialogDescription>
          </DialogHeader>

          {selectedFood && (
            <div className="space-y-4 py-2">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-md overflow-hidden mr-4">
                  <Image
                    src={selectedFood.image || "/placeholder.svg?height=64&width=64"}
                    alt={selectedFood.name}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{selectedFood.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedFood.servingSize} • {selectedFood.calories} kcal
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="servings">Servings</Label>
                  <Input
                    id="servings"
                    type="number"
                    min="0.25"
                    step="0.25"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meal-type">Meal</Label>
                  <Select value={mealType} onValueChange={setMealType}>
                    <SelectTrigger id="meal-type">
                      <SelectValue placeholder="Select meal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Breakfast">Breakfast</SelectItem>
                      <SelectItem value="Lunch">Lunch</SelectItem>
                      <SelectItem value="Dinner">Dinner</SelectItem>
                      <SelectItem value="Snacks">Snacks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div>
                  <div className="font-medium">Protein</div>
                  <div>{Math.round(selectedFood.protein * Number.parseFloat(servings || "1") * 10) / 10}g</div>
                </div>
                <div>
                  <div className="font-medium">Carbs</div>
                  <div>{Math.round(selectedFood.carbs * Number.parseFloat(servings || "1") * 10) / 10}g</div>
                </div>
                <div>
                  <div className="font-medium">Fat</div>
                  <div>{Math.round(selectedFood.fat * Number.parseFloat(servings || "1") * 10) / 10}g</div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={handleAddFood} className="w-full" disabled={isAdding}>
              {isAdding ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Adding...
                </span>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Add to Log
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

