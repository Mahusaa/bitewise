"use client"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { MealEntry } from "./meals-drawer"
import { Utensils, Coffee, Salad, Pizza, Apple } from "lucide-react"

interface MealListProps {
  entries: MealEntry[]
}

export function MealList({ entries }: MealListProps) {
  const mealGroups: Record<string, MealEntry[]> = entries.reduce((groups: Record<string, MealEntry[]>, entry) => {
    const group = groups[entry.categories] || []
    group.push(entry)
    groups[entry.categories] = group
    return groups
  }, {})

  const mealTypes = ["breakfast", "lunch", "dinner", "snacks"]
  const mealIcons = {
    breakfast: <Coffee className="text-blue-500" />,
    lunch: <Salad className="text-green-500" />,
    dinner: <Pizza className="text-amber-500" />,
    snacks: <Apple className="text-red-500" />
  }

  return (
    <div className="space-y-6">
      {mealTypes.map((mealType) => {
        const mealEntries = mealGroups[mealType] || []
        if (mealEntries.length === 0) return null

        return (
          <div key={mealType} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {mealIcons[mealType as keyof typeof mealIcons]}
                <h3 className="text-sm font-medium capitalize">{mealType}</h3>
              </div>
            </div>

            <div className="space-y-2">
              {mealEntries.map((entry, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-0">
                    <div className="flex items-center p-3">
                      {entry.image ? (
                        <div className="h-14 w-14 rounded-lg overflow-hidden mr-4 flex-shrink-0 shadow-sm">
                          <Image
                            src={entry.image || "/placeholder.svg?height=56&width=56"}
                            alt={entry.name}
                            width={56}
                            height={56}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-14 w-14 rounded-lg bg-gray-100 flex items-center justify-center mr-4 flex-shrink-0">
                          <Utensils className="text-gray-400 h-6 w-6" />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{entry.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {entry.calories} calories
                        </p>
                      </div>

                      <div className="flex gap-3 text-xs">
                        <div className="flex flex-col items-center">
                          <span className="font-medium text-green-600">{entry.protein}g</span>
                          <span className="text-muted-foreground text-xs">Protein</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="font-medium text-amber-600">{entry.carbs}g</span>
                          <span className="text-muted-foreground text-xs">Carbs</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="font-medium text-blue-600">{entry.fat}g</span>
                          <span className="text-muted-foreground text-xs">Fat</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      })}

      {Object.keys(mealGroups).length === 0 && (
        <div className="text-center py-8">
          <div className="bg-gray-50 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <Utensils className="text-gray-400 h-6 w-6" />
          </div>
          <h3 className="text-sm font-medium">No meals added yet</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Track your nutrition by adding meals
          </p>
        </div>
      )}
    </div>
  )
}
