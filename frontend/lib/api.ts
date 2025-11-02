import axios from "axios";
import { Project, ProjectFormData, ProjectFilters } from "@/types/project";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
	headers: {
		"Content-Type": "application/json",
	},
});

export const projectsApi = {
	getProjects: async (filters?: ProjectFilters) => {
		const params = new URLSearchParams();
		if (filters?.status && filters.status !== "ALL")
			params.append("status", filters.status);
		if (filters?.search) params.append("search", filters.search);
		if (filters?.sortBy) params.append("sortBy", filters.sortBy);
		if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder);
		if (filters?.page) params.append("page", filters.page.toString());
		if (filters?.size) params.append("size", filters.size.toString());

		const { data } = await api.get<{ content: Project[] }>(
			`/projects?${params}`
		);
		return data.content;
	},

	getProject: async (id: number) => {
		const { data } = await api.get<Project>(`/projects/${id}`);
		return data;
	},

	createProject: async (project: ProjectFormData) => {
		const { data } = await api.post<Project>("/projects", project);
		return data;
	},

	updateProject: async (id: number, project: Partial<ProjectFormData>) => {
		const { data } = await api.put<Project>(`/projects/${id}`, project);
		return data;
	},

	updateProjectStatus: async (id: number, status: Project["status"]) => {
		const { data } = await api.patch<Project>(`/projects/${id}/status`, {
			status,
		});
		return data;
	},

	deleteProject: async (id: number) => {
		await api.delete(`/projects/${id}`);
	},
};
