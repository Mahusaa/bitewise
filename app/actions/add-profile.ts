'use server'

import { revalidatePath } from 'next/cache';
import { saveUserProfile } from '@/server/db/queries';

export interface NewUserProfile {
  userId: string;
  age: number;
  gender: string;
  weight: string;
  height: string;
  activityLevel: string;
  goal: string;
}




export async function saveProfile(formData: FormData | NewUserProfile) {
  let profile: NewUserProfile;

  if (formData instanceof FormData) {
    profile = {
      userId: formData.get('userId') as string,
      age: Number(formData.get('age')),
      gender: formData.get('gender') as string,
      weight: formData.get('weight') as string,
      height: formData.get('height') as string,
      activityLevel: formData.get('activityLevel') as string,
      goal: formData.get('goal') as string,
    };
  } else {
    profile = formData;
  }

  try {
    // Validate the input data
    await saveUserProfile(profile)

    revalidatePath('/profile');

    return { success: true, message: "Profile saved successfully" };
  } catch (error) {
    if (error) {
      return {
        success: false,
        message: "Validation failed",
      };
    }

    console.error("Error saving profile:", error);
    return {
      success: false,
      message: "Failed to save profile"
    };
  }
}
