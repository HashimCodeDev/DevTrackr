'use client';

import { Search } from 'lucide-react';
import { ProjectStatus, ProjectFilters } from '@/types/project';

interface ProjectFiltersProps {
  filters: ProjectFilters;
  onFiltersChange: (filters: ProjectFilters) => void;
}

export default function ProjectFiltersComponent({ filters, onFiltersChange }: ProjectFiltersProps) {
  const statusOptions: Array<{ value: ProjectStatus | 'ALL'; label: string }> = [
    { value: 'ALL', label: 'All Projects' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'ACTIVE', label: 'Active' },
    { value: 'COMPLETED', label: 'Completed' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search projects..."
            value={filters.search || ''}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <select
          value={filters.status || 'ALL'}
          onChange={(e) => onFiltersChange({ ...filters, status: e.target.value as ProjectStatus | 'ALL' })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={`${filters.sortBy || 'createdAt'}-${filters.sortOrder || 'desc'}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split('-');
            onFiltersChange({ 
              ...filters, 
              sortBy: sortBy as ProjectFilters['sortBy'], 
              sortOrder: sortOrder as 'asc' | 'desc' 
            });
          }}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="createdAt-desc">Newest First</option>
          <option value="createdAt-asc">Oldest First</option>
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="dueDate-asc">Due Date (Soon)</option>
          <option value="dueDate-desc">Due Date (Later)</option>
        </select>
      </div>
    </div>
  );
}