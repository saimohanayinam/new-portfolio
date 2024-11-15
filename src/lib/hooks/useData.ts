import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, getDoc, query, orderBy, limit, where } from 'firebase/firestore';
import { profile as dummyProfile, projects as dummyProjects, blogPosts as dummyBlogPosts, services as dummyServices } from '../../data/dummy';
import { toast } from 'sonner';

// Helper function to get public user ID
async function getPublicUserId() {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('isPublic', '==', true), limit(1));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs[0].id;
    }
    return null;
  } catch (error) {
    console.error('Error getting public user:', error);
    return null;
  }
}

export function useProfile(userId?: string | null) {
  const [profile, setProfile] = useState(dummyProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        let targetUserId = userId;
        if (!targetUserId) {
          // If no userId provided, try to get the public user
          targetUserId = await getPublicUserId();
        }

        if (targetUserId) {
          const profileRef = doc(db, `users/${targetUserId}/profile/info`);
          const docSnap = await getDoc(profileRef);
          
          if (docSnap.exists()) {
            setProfile({ ...docSnap.data(), id: docSnap.id });
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [userId]);

  return { profile, loading };
}

export function useServices(userId?: string | null) {
  const [services, setServices] = useState(dummyServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        let targetUserId = userId;
        if (!targetUserId) {
          targetUserId = await getPublicUserId();
        }

        if (targetUserId) {
          const servicesRef = collection(db, `users/${targetUserId}/services`);
          const q = query(servicesRef, orderBy('createdAt', 'desc'));
          const snapshot = await getDocs(q);
          
          if (!snapshot.empty) {
            const servicesData = snapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id
            }));
            setServices(servicesData);
          }
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        toast.error('Failed to load services data');
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, [userId]);

  return { services, loading };
}

export function useProjects(userId?: string | null) {
  const [projects, setProjects] = useState(dummyProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        let targetUserId = userId;
        if (!targetUserId) {
          targetUserId = await getPublicUserId();
        }

        if (targetUserId) {
          const projectsRef = collection(db, `users/${targetUserId}/projects`);
          const q = query(projectsRef, orderBy('createdAt', 'desc'));
          const snapshot = await getDocs(q);
          
          if (!snapshot.empty) {
            const projectsData = snapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id
            }));
            setProjects(projectsData);
          }
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast.error('Failed to load projects data');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [userId]);

  return { projects, loading };
}

export function useBlogPosts(userId?: string | null) {
  const [posts, setPosts] = useState(dummyBlogPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        let targetUserId = userId;
        if (!targetUserId) {
          targetUserId = await getPublicUserId();
        }

        if (targetUserId) {
          const postsRef = collection(db, `users/${targetUserId}/blogs`);
          const q = query(postsRef, orderBy('createdAt', 'desc'));
          const snapshot = await getDocs(q);
          
          if (!snapshot.empty) {
            const postsData = snapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id
            }));
            setPosts(postsData);
          }
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        toast.error('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [userId]);

  return { posts, loading };
}

export function useSingleBlogPost(userId?: string | null, postId?: string) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        let targetUserId = userId;
        if (!targetUserId) {
          targetUserId = await getPublicUserId();
        }

        if (targetUserId && postId) {
          const postRef = doc(db, `users/${targetUserId}/blogs/${postId}`);
          const docSnap = await getDoc(postRef);
          
          if (docSnap.exists()) {
            setPost({ ...docSnap.data(), id: docSnap.id });
          } else {
            setPost(dummyBlogPosts.find(p => p.id === postId) || null);
          }
        } else if (postId) {
          setPost(dummyBlogPosts.find(p => p.id === postId) || null);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        toast.error('Failed to load blog post');
        setPost(dummyBlogPosts.find(p => p.id === postId) || null);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [userId, postId]);

  return { post, loading };
}

export function useSingleProject(userId?: string | null, projectId?: string) {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        let targetUserId = userId;
        if (!targetUserId) {
          targetUserId = await getPublicUserId();
        }

        if (targetUserId && projectId) {
          const projectRef = doc(db, `users/${targetUserId}/projects/${projectId}`);
          const docSnap = await getDoc(projectRef);
          
          if (docSnap.exists()) {
            setProject({ ...docSnap.data(), id: docSnap.id });
          } else {
            setProject(dummyProjects.find(p => p.id.toString() === projectId) || null);
          }
        } else if (projectId) {
          setProject(dummyProjects.find(p => p.id.toString() === projectId) || null);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        toast.error('Failed to load project');
        setProject(dummyProjects.find(p => p.id.toString() === projectId) || null);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [userId, projectId]);

  return { project, loading };
}