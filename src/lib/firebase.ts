import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Auth functions
export async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
}

export async function registerUser(email: string, password: string, name: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateDoc(doc(db, 'users', userCredential.user.uid), {
      name,
      email,
      createdAt: serverTimestamp()
    });
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

// Profile functions
export async function getProfile() {
  try {
    const docRef = doc(db, 'profile', 'main');
    const docSnap = await getDoc(docRef);
    return { data: docSnap.exists() ? docSnap.data() : null, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function updateProfile(data: any) {
  try {
    const docRef = doc(db, 'profile', 'main');
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

// Blog functions
export async function createBlogPost(data: any) {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      ...data,
      createdAt: serverTimestamp()
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
}

export async function getBlogPosts() {
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    const posts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { posts, error: null };
  } catch (error: any) {
    return { posts: [], error: error.message };
  }
}

export async function getBlogPost(id: string) {
  try {
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);
    return { data: docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

// Comments functions
export async function addComment(postId: string, data: any) {
  try {
    const docRef = await addDoc(collection(db, `posts/${postId}/comments`), {
      ...data,
      createdAt: serverTimestamp()
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
}

export async function getComments(postId: string) {
  try {
    const querySnapshot = await getDocs(collection(db, `posts/${postId}/comments`));
    const comments = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { comments, error: null };
  } catch (error: any) {
    return { comments: [], error: error.message };
  }
}

// Project functions
export async function createProject(data: any) {
  try {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...data,
      createdAt: serverTimestamp()
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
}

export async function getProject(id: string) {
  try {
    const docRef = doc(db, 'projects', id);
    const docSnap = await getDoc(docRef);
    return { data: docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

// File upload function
export async function uploadFile(file: File, path: string) {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return { url, error: null };
  } catch (error: any) {
    return { url: null, error: error.message };
  }
}