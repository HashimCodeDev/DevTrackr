'use client';

import { Trash2, Edit } from 'lucide-react';
import { Project, ProjectStatus } from '@/types/project';
import StatusBadge from './StatusBadge';

interface ProjectProps {
  project: Project;
  onStatusChange: (id: number, status: ProjectStatus) => void;
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}

export default function ProjectCard({ project, onStatusChange, onEdit, onDelete }: ProjectProps) {
  const getNextStatus = (current: ProjectStatus): ProjectStatus => {
    switch (current) {
      case 'PENDING': return 'ACTIVE';
      case 'ACTIVE': return 'COMPLETED';
      case 'COMPLETED': return 'PENDING';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
        <StatusBadge status={project.status} />
      </div>
      
      {project.description && (
        <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
      )}
      
      <div className="flex justify-between items-center mb-4">
        {project.dueDate && (
          <span className="text-xs text-gray-500">
            Due: {new Date(project.dueDate).toLocaleDateString()}
          </span>
        )}
        <span className="text-xs text-gray-400">
          Created: {new Date(project.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onStatusChange(project.id, getNextStatus(project.status))}
          className="flex-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
        >
          → {getNextStatus(project.status).toLowerCase()}
        </button>
        <button
          onClick={() => onEdit(project)}
          className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
          aria-label="Edit project"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(project.id)}
          className="p-1 text-gray-600 hover:text-red-600 transition-colors"
          aria-label="Delete project"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}