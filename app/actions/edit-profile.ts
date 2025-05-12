'use server'

import { updateProfile } from '@/server/db/queries'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const profileSchema = z.object({
  userId: z.string(),
  age: z.coerce.number().int().positive().max(120),
  gender: z.enum(['male', 'female']),
  weight: z.coerce.number().positive(),
  height: z.coerce.number().positive(),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very-active']),
  goal: z.enum(['weight-loss', 'maintenance', 'weight-gain']),
})

export type ActionResponse = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export type Profile = z.infer<typeof profileSchema>


export async function editProfile(prevState: ActionResponse | null, formData: FormData): Promise<ActionResponse> {
  try {
    const rawProfile = {
      userId: formData.get('userId'),
      age: formData.get('age'),
      gender: formData.get('gender'),
      weight: formData.get('weight'),
      height: formData.get('height'),
      activityLevel: formData.get('activityLevel'),
      goal: formData.get('goal'),
    }

    const result = profileSchema.safeParse(rawProfile)

    if (!result.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: result.error.flatten().fieldErrors,
      }
    }

    // Save to database
    const profile = result.data
    const saveResult = await updateProfile(profile.userId, profile)

    if (!saveResult.success) {
      return {
        success: false,
        message: 'Failed to save profile',
      }
    }

    revalidatePath('/dashboard')

    return {
      success: true,
      message: 'Profile updated successfully',
    }
  } catch (error) {
    console.error('Error updating profile:', error)
    return {
      success: false,
      message: 'An unexpected error occurred',
    }
  }
}


