import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { UserProfile } from '../../types';

export async function getProfile(userId: string) {
  try {
    const profileRef = doc(db, `users/${userId}/profile/info`);
    const docSnap = await getDoc(profileRef);
    return {
      data: docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as UserProfile : null,
      error: null
    };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function createProfile(userId: string, data: Partial<UserProfile>) {
  try {
    const profileRef = doc(db, `users/${userId}/profile/info`);
    await setDoc(profileRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateProfile(userId: string, data: Partial<UserProfile>) {
  try {
    const profileRef = doc(db, `users/${userId}/profile/info`);
    await updateDoc(profileRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}