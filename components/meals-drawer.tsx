"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { ChevronUp, Plus, Utensils } from "lucide-react"
import { MealList } from "@/components/meal-list"

export interface MealEntry {
  id: number
  name: string
  calories: string
  protein: string
  carbs: string
  fat: string
  sugar: string
  categories: string
  createdAt: Date
  image: string | null
}

interface MealsDrawerProps {
  entries: MealEntry[]
}

export function MealsDrawer({ entries }: MealsDrawerProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-full flex items-center justify-between border rounded-lg p-3 shadow-sm mt-5"
          onClick={() => setOpen(true)}
        >
          <div className="flex items-center">
            <Utensils className="h-5 w-5 text-primary mr-2" />
            <span>Todays Meals</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground mr-2">{entries.length} items</span>
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh] flex flex-col">
        <DrawerHeader className="flex justify-between items-center sticky top-0 z-10 bg-background border-b pb-4">
          <DrawerTitle>Todays Meals</DrawerTitle>
          <Button
            size="sm"
            onClick={() => {
              setOpen(false)
              router.push("/add-food")
            }}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Food
          </Button>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto px-4 pb-8 pt-2">
          <MealList entries={entries} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

