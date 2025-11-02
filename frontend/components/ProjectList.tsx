'use client';

import { Project } from '@/types/project';
import ProjectCard from './Project';

interface ProjectListProps {
  projects: Project[];
  onStatusChange: (id: number, status: Project['status']) => void;
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export default function ProjectList({ projects, onStatusChange, onEdit, onDelete, isLoading }: ProjectListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-3"></div>
            <div className="h-3 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No projects found</p>
        <p className="text-gray-400 text-sm mt-2">Create your first project to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}