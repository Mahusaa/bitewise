"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { ChevronUp, Plus, Utensils } from "lucide-react"
import { MealList } from "@/components/meal-list"
import type { FoodEntry } from "@/lib/types"
import { useRouter } from "next/navigation"

interface MealsDrawerProps {
  entries: FoodEntry[]
}

export function MealsDrawer({ entries }: MealsDrawerProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-full flex items-center justify-between border rounded-lg p-3 shadow-sm"
          onClick={() => setOpen(true)}
        >
          <div className="flex items-center">
            <Utensils className="h-5 w-5 text-green-500 mr-2" />
            <span>Today's Meals</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground mr-2">{entries.length} items</span>
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh] overflow-auto">
        <DrawerHeader className="flex justify-between items-center">
          <DrawerTitle>Today's Meals</DrawerTitle>
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
        <div className="px-4 pb-8">
          <MealList entries={entries} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

