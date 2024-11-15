import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, serverTimestamp, setDoc, query, orderBy } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Initialize Firebase with environment variables
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

// Profile image upload function with proper error handling
export async function uploadProfileImage(file: File, userId: string) {
  if (!auth.currentUser) {
    throw new Error('User must be authenticated to upload images');
  }

  try {
    // Create a reference to the user's profile images
    const storageRef = ref(storage, `users/${userId}/profile/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error: any) {
    console.error('Upload error:', error);
    if (error.code === 'storage/unauthorized') {
      throw new Error('Permission denied. Please check if you are logged in.');
    }
    throw new Error('Failed to upload image. Please try again.');
  }
}

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
    
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      name,
      email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
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

// User profile functions
export async function getUserProfile(uid: string) {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    return { data: docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function updateUserProfile(uid: string, data: any) {
  try {
    const docRef = doc(db, 'users', uid);
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
export async function createBlogPost(uid: string, data: any) {
  try {
    const blogRef = collection(db, `users/${uid}/blogs`);
    const docRef = await addDoc(blogRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
}

export async function updateBlogPost(uid: string, postId: string, data: any) {
  try {
    const postRef = doc(db, `users/${uid}/blogs`, postId);
    await updateDoc(postRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteBlogPost(uid: string, postId: string) {
  try {
    const postRef = doc(db, `users/${uid}/blogs`, postId);
    await deleteDoc(postRef);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getBlogPosts(uid: string) {
  try {
    const blogRef = collection(db, `users/${uid}/blogs`);
    const q = query(blogRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const blogs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { blogs, error: null };
  } catch (error: any) {
    return { blogs: [], error: error.message };
  }
}

// Project functions
export async function createProject(uid: string, data: any) {
  try {
    const projectRef = collection(db, `users/${uid}/projects`);
    const docRef = await addDoc(projectRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
}

export async function updateProject(uid: string, projectId: string, data: any) {
  try {
    const projectRef = doc(db, `users/${uid}/projects`, projectId);
    await updateDoc(projectRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteProject(uid: string, projectId: string) {
  try {
    const projectRef = doc(db, `users/${uid}/projects`, projectId);
    await deleteDoc(projectRef);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getProjects(uid: string) {
  try {
    const projectRef = collection(db, `users/${uid}/projects`);
    const q = query(projectRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const projects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { projects, error: null };
  } catch (error: any) {
    return { projects: [], error: error.message };
  }
}