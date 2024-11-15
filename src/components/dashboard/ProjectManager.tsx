import { useState, useEffect } from 'react';
import { Plus, Trash, Edit, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import RichTextEditor from '../RichTextEditor';
import TagInput from '../blog/TagInput';
import { createProject, updateProject, deleteProject, getProjects } from '../../lib/firebase';
import { useAuthStore } from '../../lib/store';

interface Project {
  id?: string;
  title: string;
  description: string;
  content: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: 'in-progress' | 'completed' | 'archived';
}

interface ProjectManagerProps {
  userId: string;
}

export default function ProjectManager({ userId }: ProjectManagerProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    loadProjects();
  }, [userId]);

  const loadProjects = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const { projects, error } = await getProjects(user.uid);
      if (error) throw new Error(error);
      setProjects(projects);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = () => {
    const newProject: Project = {
      title: '',
      description: '',
      content: '',
      image: '',
      tags: [],
      status: 'in-progress'
    };
    setEditingProject(newProject);
  };

  const handleSaveProject = async (project: Project) => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      if (project.id) {
        // Update existing project
        const { error } = await updateProject(user.uid, project.id, project);
        if (error) throw new Error(error);
        setProjects(projects.map(p => p.id === project.id ? project : p));
        toast.success('Project updated successfully!');
      } else {
        // Create new project
        const { id, error } = await createProject(user.uid, project);
        if (error) throw new Error(error);
        if (id) {
          setProjects([{ ...project, id }, ...projects]);
          toast.success('Project created successfully!');
        }
      }
      setEditingProject(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to save project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!user || !confirm('Are you sure you want to delete this project?')) return;

    try {
      setIsLoading(true);
      const { error } = await deleteProject(user.uid, projectId);
      if (error) throw new Error(error);
      setProjects(projects.filter(p => p.id !== projectId));
      toast.success('Project deleted successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete project');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Projects</h2>
        <button onClick={handleCreateProject} className="btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Add New Project
        </button>
      </div>

      {editingProject && (
        <ProjectForm
          project={editingProject}
          onSave={handleSaveProject}
          onCancel={() => setEditingProject(null)}
          isLoading={isLoading}
        />
      )}

      <div className="grid gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingProject(project)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => project.id && handleDeleteProject(project.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ProjectFormProps {
  project: Project;
  onSave: (project: Project) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

function ProjectForm({ project, onSave, onCancel, isLoading }: ProjectFormProps) {
  const [formData, setFormData] = useState(project);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }
    await onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Project Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="input dark:bg-gray-700 dark:text-white"
          placeholder="Enter project title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="input dark:bg-gray-700 dark:text-white"
          rows={3}
          placeholder="Brief description of the project"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tags
        </label>
        <TagInput
          tags={formData.tags}
          onChange={(tags) => setFormData({ ...formData, tags })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          GitHub URL
        </label>
        <input
          type="url"
          value={formData.githubUrl || ''}
          onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
          className="input dark:bg-gray-700 dark:text-white"
          placeholder="https://github.com/username/project"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Live URL
        </label>
        <input
          type="url"
          value={formData.liveUrl || ''}
          onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
          className="input dark:bg-gray-700 dark:text-white"
          placeholder="https://your-project.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as Project['status'] })}
          className="input dark:bg-gray-700 dark:text-white"
        >
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Content
        </label>
        <RichTextEditor
          content={formData.content}
          onChange={(content) => setFormData({ ...formData, content })}
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
          disabled={isLoading}
        >
          <Save className="w-5 h-5 mr-2" />
          {isLoading ? 'Saving...' : 'Save Project'}
        </button>
      </div>
    </form>
  );
}