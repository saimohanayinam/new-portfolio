import { useState, useEffect } from 'react';
import { Plus, Save, Trash, Edit, X, Loader } from 'lucide-react';
import { toast } from 'sonner';
import { db } from '../../lib/firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { useAuthStore } from '../../lib/store';

interface Service {
  id?: string;
  title: string;
  description: string;
  icon: string;
  createdAt?: any;
  updatedAt?: any;
}

interface ServiceManagerProps {
  userId: string;
}

export default function ServiceManager({ userId }: ServiceManagerProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    loadServices();
  }, [userId]);

  const loadServices = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const servicesRef = collection(db, `users/${user.uid}/services`);
      const snapshot = await getDocs(servicesRef);
      const servicesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Service[];
      setServices(servicesData);
    } catch (error: any) {
      toast.error('Failed to load services');
    } finally {
      setIsLoading(false);
    }
  };

  const addNewService = async () => {
    if (!user) return;
    try {
      const servicesRef = collection(db, `users/${user.uid}/services`);
      const newService = {
        title: '',
        description: '',
        icon: 'Layout',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      const docRef = await addDoc(servicesRef, newService);
      setServices([...services, { ...newService, id: docRef.id }]);
      toast.success('New service added');
    } catch (error: any) {
      toast.error('Failed to add service');
    }
  };

  const removeService = async (id: string) => {
    if (!user || !confirm('Are you sure you want to delete this service?')) return;
    try {
      const serviceRef = doc(db, `users/${user.uid}/services/${id}`);
      await deleteDoc(serviceRef);
      setServices(services.filter(service => service.id !== id));
      toast.success('Service deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete service');
    }
  };

  const updateService = async (id: string, field: keyof Service, value: string) => {
    if (!user) return;
    try {
      const serviceRef = doc(db, `users/${user.uid}/services/${id}`);
      await updateDoc(serviceRef, {
        [field]: value,
        updatedAt: serverTimestamp()
      });
      setServices(services.map(service =>
        service.id === id ? { ...service, [field]: value } : service
      ));
    } catch (error: any) {
      toast.error('Failed to update service');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Services</h2>
        <button onClick={addNewService} className="btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Add New Service
        </button>
      </div>
      
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="grid grid-cols-1 gap-4 p-4 border dark:border-gray-700 rounded-lg relative">
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setEditingService(service)}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => service.id && removeService(service.id)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-full"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Service Title
              </label>
              <input
                type="text"
                value={service.title}
                onChange={(e) => service.id && updateService(service.id, 'title', e.target.value)}
                className="input dark:bg-gray-700 dark:text-white"
                placeholder="Enter service title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Service Description
              </label>
              <textarea
                value={service.description}
                onChange={(e) => service.id && updateService(service.id, 'description', e.target.value)}
                rows={2}
                className="input dark:bg-gray-700 dark:text-white"
                placeholder="Enter service description"
              />
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">No services added yet. Click the button above to add your first service.</p>
          </div>
        )}
      </div>

      {editingService && (
        <ServiceEditModal
          service={editingService}
          onClose={() => setEditingService(null)}
          onSave={async (updatedService) => {
            if (!user || !updatedService.id) return;
            try {
              const serviceRef = doc(db, `users/${user.uid}/services/${updatedService.id}`);
              await updateDoc(serviceRef, {
                ...updatedService,
                updatedAt: serverTimestamp()
              });
              setServices(services.map(s =>
                s.id === updatedService.id ? updatedService : s
              ));
              setEditingService(null);
              toast.success('Service updated successfully');
            } catch (error: any) {
              toast.error('Failed to update service');
            }
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!editedService.title.trim()) {
      toast.error('Service title is required');
      return;
    }
    setIsLoading(true);
    try {
      await onSave(editedService);
    } finally {
      setIsLoading(false);
    }
  };

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
              placeholder="Enter service title"
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
              placeholder="Enter service description"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button 
              onClick={onClose} 
              className="btn-secondary flex-1"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              onClick={handleSave} 
              className="btn-primary flex-1"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}