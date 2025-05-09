"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type { FoodEntry } from "@/lib/types"

interface MealListProps {
  entries: FoodEntry[]
}

export function MealList({ entries }: MealListProps) {
  // Group entries by meal type
  const mealGroups = entries.reduce((groups, entry) => {
    const group = groups[entry.mealType] || []
    group.push(entry)
    groups[entry.mealType] = group
    return groups
  }, {})

  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snacks"]

  return (
    <div className="space-y-4">
      {mealTypes.map((mealType) => {
        const mealEntries = mealGroups[mealType] || []
        if (mealEntries.length === 0) return null

        return (
          <div key={mealType} className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">{mealType}</h3>
            {mealEntries.map((entry, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center p-2">
                    <div className="h-12 w-12 rounded-md overflow-hidden mr-3">
                      <Image
                        src={entry.image || "/placeholder.svg?height=48&width=48"}
                        alt={entry.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{entry.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {entry.servingSize} • {entry.calories} kcal
                      </p>
                    </div>
                    <div className="text-right text-xs">
                      <div>P: {entry.protein}g</div>
                      <div>C: {entry.carbs}g</div>
                      <div>F: {entry.fat}g</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      })}
    </div>
  )
}

