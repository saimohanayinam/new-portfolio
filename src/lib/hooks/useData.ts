import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, getDoc, query, orderBy, limit, where } from 'firebase/firestore';
import { profile as dummyProfile, projects as dummyProjects, blogPosts as dummyBlogPosts, services as dummyServices } from '../../data/dummy';
import { toast } from 'sonner';

export function useProfile(userId?: string | null) {
  const [profile, setProfile] = useState(dummyProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        if (!userId) {
          setProfile(dummyProfile);
          setLoading(false);
          return;
        }

        const profileRef = doc(db, `users/${userId}/profile/info`);
        const docSnap = await getDoc(profileRef);
        
        if (docSnap.exists()) {
          setProfile({ ...docSnap.data(), id: docSnap.id });
        } else {
          setProfile(dummyProfile);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile data');
        setProfile(dummyProfile);
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
        if (!userId) {
          setServices(dummyServices);
          setLoading(false);
          return;
        }

        const servicesRef = collection(db, `users/${userId}/services`);
        const q = query(servicesRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const servicesData = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }));
          setServices(servicesData);
        } else {
          setServices(dummyServices);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        toast.error('Failed to load services data');
        setServices(dummyServices);
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
        if (!userId) {
          setProjects(dummyProjects);
          setLoading(false);
          return;
        }

        const projectsRef = collection(db, `users/${userId}/projects`);
        const q = query(projectsRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const projectsData = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }));
          setProjects(projectsData);
        } else {
          setProjects(dummyProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast.error('Failed to load projects data');
        setProjects(dummyProjects);
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
        if (!userId) {
          setPosts(dummyBlogPosts);
          setLoading(false);
          return;
        }

        const postsRef = collection(db, `users/${userId}/blogs`);
        const q = query(postsRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const postsData = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }));
          setPosts(postsData);
        } else {
          setPosts(dummyBlogPosts);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        toast.error('Failed to load blog posts');
        setPosts(dummyBlogPosts);
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
        if (!userId || !postId) {
          const dummyPost = dummyBlogPosts.find(p => p.id === postId);
          setPost(dummyPost || null);
          setLoading(false);
          return;
        }

        const postRef = doc(db, `users/${userId}/blogs/${postId}`);
        const docSnap = await getDoc(postRef);
        
        if (docSnap.exists()) {
          setPost({ ...docSnap.data(), id: docSnap.id });
        } else {
          const dummyPost = dummyBlogPosts.find(p => p.id === postId);
          setPost(dummyPost || null);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        toast.error('Failed to load blog post');
        const dummyPost = dummyBlogPosts.find(p => p.id === postId);
        setPost(dummyPost || null);
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
        if (!userId || !projectId) {
          const dummyProject = dummyProjects.find(p => p.id.toString() === projectId);
          setProject(dummyProject || null);
          setLoading(false);
          return;
        }

        const projectRef = doc(db, `users/${userId}/projects/${projectId}`);
        const docSnap = await getDoc(projectRef);
        
        if (docSnap.exists()) {
          setProject({ ...docSnap.data(), id: docSnap.id });
        } else {
          const dummyProject = dummyProjects.find(p => p.id.toString() === projectId);
          setProject(dummyProject || null);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        toast.error('Failed to load project');
        const dummyProject = dummyProjects.find(p => p.id.toString() === projectId);
        setProject(dummyProject || null);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [userId, projectId]);

  return { project, loading };
}