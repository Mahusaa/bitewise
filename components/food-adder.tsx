"use client"
import { useState, useActionState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "./ui/select"
import { Alert, AlertTitle, AlertDescription } from "./ui/alert"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import type { MealData } from "@/app/actions/extract-food"
import { Check, Loader2, PlusIcon, AlertCircle } from "lucide-react"
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
      console.log("this is the error", data.error)
      toast.success(addFoodState.message);
    } else if (addFoodState.message) {
      toast.error(addFoodState.message);
    }
  }, [addFoodState, data.error])
  if (data.error) {
    return (
      <Card className="overflow-hidden">
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <AlertTitle>Unable to identified</AlertTitle>
            <AlertDescription>
              {data.error}
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="pt-2">
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </CardFooter>
      </Card>)
  }

  return (
    <form action={addFoodAction}>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            {data.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="meal-type">Add to</Label>
              <Select value={mealType} onValueChange={setMealType}>
                <SelectTrigger id="meal-type" className="w-full">
                  <SelectValue placeholder="Select meal" />
                </SelectTrigger>
                <SelectContent>
                  {["breakfast", "lunch", "dinner", "snacks"].map((meal) => (
                    <SelectItem key={meal} value={meal}>
                      {meal.charAt(0).toUpperCase() + meal.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>


          <div className="rounded-lg overflow-hidden border">
            <div className="bg-primary text-primary-foreground p-3">
              <h4 className="font-medium">Nutritional Information</h4>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Calories</span>
                <span className="text-lg font-bold">
                  {data.calories} kcal
                </span>
              </div>

              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Protein</span>
                </div>
                <div className="text-right font-medium">
                  {data.protein}g
                </div>

                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                  <span>Carbs</span>
                </div>
                <div className="text-right font-medium">
                  {data.carbs}g
                </div>

                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-rose-500 mr-2"></div>
                  <span>Fat</span>
                </div>
                <div className="text-right font-medium">
                  {data.fat}g
                </div>

                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                  <span>Sugar</span>
                </div>
                <div className="text-right font-medium">
                  {data.sugar}g
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 pt-2">
          <Button
            className="w-full"
            type={addFoodState.success ? 'button' : 'submit'}
            onClick={addFoodState.success ? () => window.location.reload() : undefined}
          >
            {addFoodState.success ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Upload Another
              </>
            ) : isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <PlusIcon className="h-4 w-4 mr-2" />
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
