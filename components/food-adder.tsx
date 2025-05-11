"use client"
import { useState, useActionState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "./ui/select"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import type { MealData } from "@/app/actions/extract-food"
import { Check, Loader2 } from "lucide-react"
import { addFoodFromScan } from "@/app/actions/add-food"
import { toast } from "sonner"

type Props = {
  data: MealData;
};
const initialState = {
  success: false,
  message: "",
}


export default function FoodAdder({ data }: Props) {
  const [mealType, setMealType] = useState("breakfast");
  const [addFoodState, addFoodAction, isPending] = useActionState(addFoodFromScan, initialState)


  useEffect(() => {
    if (addFoodState.success) {
      toast.success(addFoodState.message);
    } else if (addFoodState.message) {
      toast.error(addFoodState.message);
    }
  }, [addFoodState])
  return (
    <form action={addFoodAction}>
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50 pb-2">
          <CardTitle className="text-lg flex items-center">
            {data.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="meal-type">Add to</Label>
              <Select value={mealType} onValueChange={setMealType}>
                <SelectTrigger id="meal-type">
                  <SelectValue placeholder="Select meal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="snacks">Snacks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-muted rounded-lg overflow-hidden">
            <div className="bg-muted/80 px-4 py-2 border-b">
              <h4 className="font-medium">Nutritional Information</h4>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-between items-center py-1 border-b">
                  <span className="font-medium">Calories</span>
                  <span className="text-right">
                    {data.calories} kcal
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b">
                  <span className="font-medium">Protein</span>
                  <span className="text-right">
                    {data.protein}g
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b">
                  <span className="font-medium">Carbs</span>
                  <span className="text-right">
                    {data.carbs}g
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b">
                  <span className="font-medium">Fat</span>
                  <span className="text-right">
                    {data.fat}g
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="font-medium">Sugar</span>
                  <span className="text-right">
                    {data.sugar}g
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 pt-2">
          <Button className="w-full" type="submit">
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Add to {mealType}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      <input type="hidden" name="name" value={data.name} />
      <input type="hidden" name="cal" value={data.calories} />
      <input type="hidden" name="protein" value={data.protein} />
      <input type="hidden" name="carbs" value={data.carbs} />
      <input type="hidden" name="fat" value={data.fat} />
      <input type="hidden" name="sugar" value={data.sugar} />
      <input type="hidden" name="categories" value={mealType} />
    </form>
  )
}
