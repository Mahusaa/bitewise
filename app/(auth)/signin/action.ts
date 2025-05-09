'use server';

import { signIn } from '@/server/auth';

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (typeof error === 'string') {
      switch (error) {
        case 'CredentialsSignin':
          return 'Email atau password salah.'
        default:
          return 'Terjadi kesalahan. Silakan coba lagi.'
      }
    }
    throw error;
  }
}
