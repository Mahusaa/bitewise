"server-only"
import { NewUserProfile, userProfiles } from "./schema";
import { db } from ".";
import { and, between, eq } from "drizzle-orm";
import { meals } from "./schema";
import { Profile } from "@/app/actions/edit-profile";


export async function saveUserProfile(profile: NewUserProfile) {
  await db.insert(userProfiles).values({
    userId: profile.userId,
    age: profile.age,
    gender: profile.gender,
    weight: profile.weight,
    height: profile.height,
    activityLevel: profile.activityLevel,
    goal: profile.goal,
  });
}

export async function updateProfile(userId: string, profile: Profile) {
  await db.update(userProfiles)
    .set({
      age: profile.age,
      gender: profile.gender,
      weight: String(profile.weight),
      height: String(profile.height),
      activityLevel: profile.activityLevel,
      goal: profile.goal,
    })
    .where(eq(userProfiles.userId, userId))

  return {
    success: true
  }
}

export async function hasProfile(userId: string): Promise<boolean> {
  const result = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.userId, userId))
    .limit(1)
  return result.length > 0
}

export async function getProfile(userId: string) {
  const result = await db.query.userProfiles.findFirst({
    where: eq(userProfiles.userId, userId)
  })
  return result
}

export async function getTodayMeals(userId: string) {
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)
  const endOfDay = new Date()
  endOfDay.setHours(23, 59, 59, 999)
  const result = await db.query.meals.findMany({
    where: and(eq(meals.userId, userId), between(meals.createdAt, startOfDay, endOfDay))
  })
  return result
}


