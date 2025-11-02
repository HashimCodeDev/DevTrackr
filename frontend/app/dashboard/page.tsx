'use client';

import { useState, useEffect } from 'react';

interface Project {
  id: number;
  name: string;
  description: string;
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects', {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      setProjects(data.content || data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await fetch(`/api/projects/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(status),
      });
      fetchProjects();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <p className="text-gray-600 mb-2">{project.description}</p>
                  <p className="text-sm text-gray-500">Due: {project.dueDate}</p>
                </div>
                <select
                  value={project.status}
                  onChange={(e) => updateStatus(project.id, e.target.value)}
                  className="px-3 py-1 border rounded"
                >
                  <option value="PENDING">Pending</option>
                  <option value="ACTIVE">Active</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
        
        {projects.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No projects found. Create your first project!
          </div>
        )}
      </div>
    </div>
  );
}