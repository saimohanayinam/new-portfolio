import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { profile as dummyProfile, projects as dummyProjects, blogPosts as dummyBlogPosts, services as dummyServices } from '../../data/dummy';
import { toast } from 'sonner';

export function useProfile(userId?: string | null) {
  const [profile, setProfile] = useState(dummyProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const profileRef = doc(db, `users/${userId}/profile/info`);
        const docSnap = await getDoc(profileRef);
        
        if (docSnap.exists()) {
          setProfile({ ...docSnap.data(), id: docSnap.id });
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
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const servicesRef = collection(db, `users/${userId}/services`);
        const snapshot = await getDocs(servicesRef);
        
        if (!snapshot.empty) {
          const servicesData = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }));
          setServices(servicesData);
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
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const projectsRef = collection(db, `users/${userId}/projects`);
        const snapshot = await getDocs(projectsRef);
        
        if (!snapshot.empty) {
          const projectsData = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }));
          setProjects(projectsData);
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
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const postsRef = collection(db, `users/${userId}/blogs`);
        const snapshot = await getDocs(postsRef);
        
        if (!snapshot.empty) {
          const postsData = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }));
          setPosts(postsData);
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
      if (!userId || !postId) {
        setPost(dummyBlogPosts.find(p => p.id === postId) || null);
        setLoading(false);
        return;
      }

      try {
        const postRef = doc(db, `users/${userId}/blogs/${postId}`);
        const docSnap = await getDoc(postRef);
        
        if (docSnap.exists()) {
          setPost({ ...docSnap.data(), id: docSnap.id });
        } else {
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
      if (!userId || !projectId) {
        setProject(dummyProjects.find(p => p.id.toString() === projectId) || null);
        setLoading(false);
        return;
      }

      try {
        const projectRef = doc(db, `users/${userId}/projects/${projectId}`);
        const docSnap = await getDoc(projectRef);
        
        if (docSnap.exists()) {
          setProject({ ...docSnap.data(), id: docSnap.id });
        } else {
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