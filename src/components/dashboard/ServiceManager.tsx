import { useState } from 'react';
import { Plus, Save, Trash, Edit, X } from 'lucide-react';
import { toast } from 'sonner';
import { updateUserProfile } from '../../lib/firebase';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface ServiceManagerProps {
  services: Service[];
  setServices: (services: Service[]) => void;
  userId: string;
}

export default function ServiceManager({ services, setServices, userId }: ServiceManagerProps) {
  const [editingService, setEditingService] = useState<Service | null>(null);

  const addNewServices = () => {
    setServices([
      ...services,
      { id: crypto.randomUUID(), title: '', description: '', icon: 'Layout' },
      { id: crypto.randomUUID(), title: '', description: '', icon: 'Code' }
    ]);
  };

  const removeService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  const updateService = (id: string, field: keyof Service, value: string) => {
    setServices(services.map(service =>
      service.id === id ? { ...service, [field]: value } : service
    ));
  };

  const saveServices = async () => {
    try {
      await updateUserProfile(userId, { services });
      toast.success('Services saved successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save services');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Services</h2>
        <button onClick={addNewServices} className="btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Add New Services
        </button>
      </div>
      
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="grid grid-cols-1 gap-4 p-4 border dark:border-gray-700 rounded-lg relative">
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                key={`edit-${service.id}`}
                onClick={() => setEditingService(service)}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                key={`delete-${service.id}`}
                onClick={() => removeService(service.id)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-full"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>

            <div key={`title-${service.id}`}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Service Title
              </label>
              <input
                type="text"
                value={service.title}
                onChange={(e) => updateService(service.id, 'title', e.target.value)}
                className="input dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div key={`description-${service.id}`}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Service Description
              </label>
              <textarea
                value={service.description}
                onChange={(e) => updateService(service.id, 'description', e.target.value)}
                rows={2}
                className="input dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        ))}
      </div>

      {services.length > 0 && (
        <button onClick={saveServices} className="btn-primary w-full mt-4">
          <Save className="w-5 h-5 mr-2" />
          Save All Services
        </button>
      )}

      {editingService && (
        <ServiceEditModal
          service={editingService}
          onClose={() => setEditingService(null)}
          onSave={(updatedService) => {
            setServices(services.map(s =>
              s.id === updatedService.id ? updatedService : s
            ));
            setEditingService(null);
          }}
        />
      )}
    </div>
  );
}

interface ServiceEditModalProps {
  service: Service;
  onClose: () => void;
  onSave: (service: Service) => void;
}

function ServiceEditModal({ service, onClose, onSave }: ServiceEditModalProps) {
  const [editedService, setEditedService] = useState(service);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold dark:text-white">Edit Service</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Service Title
            </label>
            <input
              type="text"
              value={editedService.title}
              onChange={(e) => setEditedService({ ...editedService, title: e.target.value })}
              className="input dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Service Description
            </label>
            <textarea
              value={editedService.description}
              onChange={(e) => setEditedService({ ...editedService, description: e.target.value })}
              rows={3}
              className="input dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button onClick={() => onSave(editedService)} className="btn-primary flex-1">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}