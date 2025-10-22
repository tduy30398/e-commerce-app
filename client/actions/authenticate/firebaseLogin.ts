import { signInWithPopup } from 'firebase/auth';
import {
  auth,
  googleProvider,
  facebookProvider,
  githubProvider,
} from '@/lib/firebase';

export async function firebaseLogin(
  providerType: 'google' | 'facebook' | 'github'
) {
  let provider;
  switch (providerType) {
    case 'google':
      provider = googleProvider;
      break;
    case 'facebook':
      provider = facebookProvider;
      break;
    case 'github':
      provider = githubProvider;
      break;
    default:
      throw new Error('Unsupported provider');
  }

  const result = await signInWithPopup(auth, provider);

  const idToken = await result.user.getIdToken();

  const res = await fetch('/api/auth/firebase-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });

  if (!res.ok) throw new Error('Failed to sign in with Firebase provider');

  const data = await res.json();
  return data;
}
