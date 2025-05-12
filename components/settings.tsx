'use client'

import { useEffect, useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Save } from "lucide-react"
import { UserProfile } from "@/server/db/schema"
import { toast } from "sonner"
import { ActionResponse, editProfile } from "@/app/actions/edit-profile"



const initialState: ActionResponse = {
  success: false,
  message: "",
}

export default function Settings({ profile }: { profile: UserProfile }) {
  const [profileState, profileAction, isPending] = useActionState(editProfile, initialState)
  useEffect(() => {
    if (profileState.success) {
      toast.success(profileState.message);
    } else if (profileState.message) {
      toast.error(profileState.message);
    }
  }, [profileState])

  return (
    <>
      <header className="flex items-center mb-6">
        <h1 className="text-xl font-bold ml-2">Profile Settings</h1>
      </header>

      <form action={profileAction}>
        <Card>
          <CardHeader>
            <CardTitle>Edit Your Profile</CardTitle>
            <CardDescription>Update your information to recalculate your nutritional needs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                defaultValue={profile.age}
                className={profileState.errors?.age ? "border-red-500" : ""}
              />
              {profileState.errors?.age && (
                <p className="text-sm text-red-500">{profileState.errors.age[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup
                defaultValue={profile.gender}
                name="gender"
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
              {profileState.errors?.gender && (
                <p className="text-sm text-red-500">{profileState.errors.gender[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                defaultValue={profile.weight}
                className={profileState.errors?.weight ? "border-red-500" : ""}
              />
              {profileState.errors?.weight && (
                <p className="text-sm text-red-500">{profileState.errors.weight[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                name="height"
                type="number"
                defaultValue={profile.height}
                className={profileState.errors?.height ? "border-destructive" : ""}
              />
              {profileState.errors?.height && (
                <p className="text-sm text-red-500">{profileState.errors.height[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="activityLevel">Activity Level</Label>
              <Select
                name="activityLevel"
                defaultValue={profile.activityLevel}
              >
                <SelectTrigger className={profileState.errors?.activityLevel ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                  <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                  <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                  <SelectItem value="very-active">Very Active (hard exercise daily)</SelectItem>
                </SelectContent>
              </Select>
              {profileState.errors?.activityLevel && (
                <p className="text-sm text-red-500">{profileState.errors?.activityLevel[0]}</p>
              )}
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="goal">Fitness Goal</Label>
              <Select
                name="goal"
                defaultValue={profile.goal}
              >
                <SelectTrigger className={profileState.errors?.goal ? "border-red-500 w-full" : "w-full"}>
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight-loss">Weight Loss</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="weight-gain">Weight Gain</SelectItem>
                </SelectContent>
              </Select>
              {profileState.errors?.goal && (
                <p className="text-sm text-red-500">{profileState.errors.goal[0]}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        <input name="userId" type="hidden" value={profile.userId} />
      </form>
    </>
  )
}

