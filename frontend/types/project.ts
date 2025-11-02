export type ProjectStatus = 'PENDING' | 'ACTIVE' | 'COMPLETED';

export interface Project {
  id: number;
  name: string;
  description?: string;
  status: ProjectStatus;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  name: string;
  description?: string;
  status: ProjectStatus;
  dueDate?: string;
}

export interface ProjectFilters {
  status?: ProjectStatus | 'ALL';
  search?: string;
  sortBy?: 'name' | 'dueDate' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  size?: number;
}