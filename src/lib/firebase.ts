import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, serverTimestamp, setDoc, query, orderBy, where } from 'firebase/firestore';
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

// Helper function to generate a unique username
async function generateUniqueUsername(baseName: string): Promise<string> {
  const sanitizedName = baseName.toLowerCase().replace(/[^a-z0-9]/g, '');
  let username = sanitizedName;
  let counter = 1;
  
  while (true) {
    const usernameRef = collection(db, 'usernames');
    const q = query(usernameRef, where('username', '==', username));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return username;
    }
    
    username = `${sanitizedName}${counter}`;
    counter++;
  }
}

export async function getUserTheme(userId: string) {
  try {
    const themeDoc = await getDoc(doc(db, `users/${userId}/settings/theme`));
    return themeDoc.exists() ? themeDoc.data().themeId : null;
  } catch (error) {
    console.error('Error getting user theme:', error);
    return null;
  }
}

// Check if username is available
export async function checkUsernameAvailability(username: string): Promise<boolean> {
  const usernameRef = collection(db, 'usernames');
  const q = query(usernameRef, where('username', '==', username.toLowerCase()));
  const snapshot = await getDocs(q);
  return snapshot.empty;
}

// Update username
export async function updateUsername(userId: string, newUsername: string) {
  const isAvailable = await checkUsernameAvailability(newUsername);
  if (!isAvailable) {
    throw new Error('Username is already taken');
  }

  const userDoc = await getDoc(doc(db, 'users', userId));
  const oldUsername = userDoc.data()?.username;

  // Start a batch write
  const batch = db.batch();

  // Update user document
  const userRef = doc(db, 'users', userId);
  batch.update(userRef, { 
    username: newUsername.toLowerCase(),
    updatedAt: serverTimestamp()
  });

  // Delete old username document if it exists
  if (oldUsername) {
    const oldUsernameRef = doc(db, 'usernames', oldUsername);
    batch.delete(oldUsernameRef);
  }

  // Create new username document
  const newUsernameRef = doc(db, 'usernames', newUsername.toLowerCase());
  batch.set(newUsernameRef, {
    userId,
    username: newUsername.toLowerCase(),
    createdAt: serverTimestamp()
  });

  await batch.commit();
}

export async function uploadProfileImage(file: File, userId: string) {
  if (!auth.currentUser) {
    throw new Error('User must be authenticated to upload images');
  }

  try {
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
    const username = await generateUniqueUsername(name);
    
    // Create user document
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      name,
      email,
      username,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      isPublic: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // Create username document
    await setDoc(doc(db, 'usernames', username), {
      userId: userCredential.user.uid,
      username,
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

export async function getUserByUsername(username: string) {
  try {
    const usernameRef = collection(db, 'usernames');
    const q = query(usernameRef, where('username', '==', username.toLowerCase()));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return { data: null, error: 'User not found' };
    }

    const usernameDoc = snapshot.docs[0];
    const userId = usernameDoc.data().userId;
    const userDoc = await getDoc(doc(db, 'users', userId));

    if (!userDoc.exists()) {
      return { data: null, error: 'User not found' };
    }

    const userData = userDoc.data();
    if (!userData.isPublic) {
      return { data: null, error: 'This profile is private' };
    }

    return { 
      data: { 
        id: userDoc.id,
        ...userData
      }, 
      error: null 
    };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

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