'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import ProjectForm from '@/components/ProjectForm';
import ProjectList from '@/components/ProjectList';
import ProjectFilters from '@/components/ProjectFilters';
import Toast from '@/components/Toast';
import ConfirmDialog from '@/components/ConfirmDialog';
import { useProjects, useCreateProject, useUpdateProject, useUpdateProjectStatus, useDeleteProject } from '@/hooks/useProjects';
import { ProjectFormData, ProjectFilters as Filters, Project } from '@/types/project';

export default function Home() {
  const [filters, setFilters] = useState<Filters>({});
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: number; name: string } | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const { data: projects = [], isLoading } = useProjects(filters);
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const updateStatus = useUpdateProjectStatus();
  const deleteProject = useDeleteProject();

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const handleCreateProject = async (data: ProjectFormData) => {
    try {
      await createProject.mutateAsync(data);
      setShowForm(false);
      showToast('Project created successfully!');
    } catch (error) {
      showToast('Failed to create project', 'error');
    }
  };

  const handleUpdateProject = async (data: ProjectFormData) => {
    if (!editingProject) return;
    try {
      await updateProject.mutateAsync({ id: editingProject.id, data });
      setEditingProject(null);
      showToast('Project updated successfully!');
    } catch (error) {
      showToast('Failed to update project', 'error');
    }
  };

  const handleStatusChange = async (id: number, status: Project['status']) => {
    try {
      await updateStatus.mutateAsync({ id, status });
      showToast('Status updated successfully!');
    } catch (error) {
      showToast('Failed to update status', 'error');
    }
  };

  const handleDeleteProject = async () => {
    if (!deleteConfirm) return;
    try {
      await deleteProject.mutateAsync(deleteConfirm.id);
      setDeleteConfirm(null);
      showToast('Project deleted successfully!');
    } catch (error) {
      showToast('Failed to delete project', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">DevTrackr</h1>
              <p className="text-gray-600 mt-2">Manage your projects efficiently</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              New Project
            </button>
          </div>
        </header>

        <ProjectFilters filters={filters} onFiltersChange={setFilters} />

        <ProjectList
          projects={projects}
          onStatusChange={handleStatusChange}
          onEdit={setEditingProject}
          onDelete={(id) => {
            const project = projects.find(p => p.id === id);
            if (project) setDeleteConfirm({ id, name: project.name });
          }}
          isLoading={isLoading}
        />

        {showForm && (
          <ProjectForm
            onSubmit={handleCreateProject}
            onCancel={() => setShowForm(false)}
            isModal
          />
        )}

        {editingProject && (
          <ProjectForm
            onSubmit={handleUpdateProject}
            onCancel={() => setEditingProject(null)}
            initialData={editingProject}
            isModal
          />
        )}

        <ConfirmDialog
          isOpen={!!deleteConfirm}
          title="Delete Project"
          message={`Are you sure you want to delete "${deleteConfirm?.name}"? This action cannot be undone.`}
          onConfirm={handleDeleteProject}
          onCancel={() => setDeleteConfirm(null)}
          confirmText="Delete"
          type="danger"
        />

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}