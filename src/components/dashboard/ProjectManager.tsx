import { useState } from 'react';
import { Plus, Trash, Edit } from 'lucide-react';
import { toast } from 'sonner';
import RichTextEditor from '../RichTextEditor';
import { updateUserProfile } from '../../lib/firebase';

interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  tags: string[];
}

interface ProjectManagerProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  userId: string;
}

export default function ProjectManager({ projects, setProjects, userId }: ProjectManagerProps) {
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const addNewProject = () => {
    const newProject = {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      content: '',
      image: '',
      tags: []
    };
    setProjects([...projects, newProject]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setProjects(projects.map(project =>
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const saveProjects = async () => {
    try {
      await updateUserProfile(userId, { projects });
      toast.success('Projects saved successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save projects');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Projects</h2>
        <button onClick={addNewProject} className="btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Add New Project
        </button>
      </div>

      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                  placeholder="Project Title"
                  className="text-xl font-bold mb-2 w-full bg-transparent border-none focus:ring-0"
                />
                <input
                  type="text"
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  placeholder="Project Description"
                  className="text-gray-600 dark:text-gray-300 w-full bg-transparent border-none focus:ring-0"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingProject(project)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeProject(project.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <input
                type="text"
                value={project.tags.join(', ')}
                onChange={(e) => updateProject(project.id, 'tags', e.target.value.split(',').map(tag => tag.trim()))}
                placeholder="Tags (comma-separated)"
                className="input mb-4"
              />
              <RichTextEditor
                content={project.content}
                onChange={(content) => updateProject(project.id, 'content', content)}
              />
            </div>
          </div>
        ))}
      </div>

      {projects.length > 0 && (
        <button onClick={saveProjects} className="btn-primary w-full">
          Save All Projects
        </button>
      )}
    </div>
  );
}