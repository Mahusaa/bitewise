"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { saveProfile } from "@/app/actions/add-profile"
import { ArrowRight, Leaf } from "lucide-react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function Onboarding({ userId }: { userId: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState({
    userId: userId ?? "",
    age: 0,
    gender: "male",
    weight: "",
    height: "",
    activityLevel: "moderate",
    goal: "maintenance",
  })

  const handleChange = (field: keyof typeof profile, value: string | number) => {
    setProfile({ ...profile, [field]: value })
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      startTransition(async () => {
        try {
          const result = await saveProfile(profile)

          if (result.success) {
            router.push("/dashboard")
            toast.success("Profile created successfully!")
          } else {
            toast.error(result.message || "Failed to save profile")
          }
        } catch (error) {
          console.error("Failed to save profile", error)
          toast?.error("An unexpected error occurred")
        }
      })
    }
  }

  const isStepValid = () => {
    if (step === 1) {
      return profile.age && profile.gender
    } else if (step === 2) {
      return profile.weight && profile.height
    }
    return true
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-8">
        <Leaf className="h-8 w-8 text-green-500 mr-2" />
        <h1 className="text-2xl font-bold">BiteWise</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Your Profile</CardTitle>
          <CardDescription>We&apos;ll use this information to calculate your nutritional needs</CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <Tabs value={`step-${step}`} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 w-full">
              <TabsTrigger value="step-1" disabled>
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="step-2" disabled>
                Body Stats
              </TabsTrigger>
              <TabsTrigger value="step-3" disabled>
                Goals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="step-1" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={profile.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup
                  value={profile.gender}
                  onValueChange={(value) => handleChange("gender", value)}
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
              </div>
            </TabsContent>

            <TabsContent value="step-2" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter your weight"
                  value={profile.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter your height"
                  value={profile.height}
                  onChange={(e) => handleChange("height", e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="step-3" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="activity">Activity Level</Label>
                <Select value={profile.activityLevel} onValueChange={(value) => handleChange("activityLevel", value)}>
                  <SelectTrigger className="w-full">
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">Fitness Goal</Label>
                <Select value={profile.goal} onValueChange={(value) => handleChange("goal", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="weight-gain">Weight Gain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full flex items-center justify-center"
            onClick={handleNext}
            disabled={!isStepValid() || isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                {step < 3 ? "Next" : "Complete Setup"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}


