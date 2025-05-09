"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import type { UserProfile } from "@/lib/types"
import { BottomNavbar } from "@/components/bottom-navbar"

export default function SettingsPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    // Get profile from cookies
    const profileCookie = document.cookie.split("; ").find((row) => row.startsWith("user-profile="))

    if (!profileCookie) {
      router.push("/onboarding")
      return
    }

    try {
      const profileData = JSON.parse(profileCookie.split("=")[1])
      setProfile(profileData)
    } catch (error) {
      console.error("Error parsing profile:", error)
      router.push("/onboarding")
    }
  }, [router])

  const handleChange = (field, value) => {
    if (!profile) return
    setProfile({ ...profile, [field]: value })
  }

  const handleSave = () => {
    if (!profile) return

    // Save profile to cookies
    document.cookie = `user-profile=${JSON.stringify(profile)}; path=/; max-age=${60 * 60 * 24 * 30}`
    router.push("/dashboard")
  }

  if (!profile) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-6 pb-20">
      <header className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold ml-2">Profile Settings</h1>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Edit Your Profile</CardTitle>
          <CardDescription>Update your information to recalculate your nutritional needs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" value={profile.age} onChange={(e) => handleChange("age", e.target.value)} />
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

          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={profile.weight}
              onChange={(e) => handleChange("weight", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              value={profile.height}
              onChange={(e) => handleChange("height", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity">Activity Level</Label>
            <Select value={profile.activityLevel} onValueChange={(value) => handleChange("activityLevel", value)}>
              <SelectTrigger>
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
              <SelectTrigger>
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weight-loss">Weight Loss</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="weight-gain">Weight Gain</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </CardFooter>
      </Card>

      <BottomNavbar />
    </div>
  )
}

