import axios from "axios";
import { Project, ProjectFormData, ProjectFilters } from "@/types/project";
import { LoginRequest, RegisterRequest, AuthResponse } from "@/types/auth";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
	headers: {
		"Content-Type": "application/json",
	},
});

// Add token to requests if available
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export const authApi = {
	login: async (credentials: LoginRequest) => {
		const { data } = await api.post<AuthResponse>(
			"/api/auth/login",
			credentials
		);
		localStorage.setItem("token", data.token);
		return data;
	},

	register: async (userData: RegisterRequest) => {
		const { data } = await api.post<AuthResponse>("/auth/register", userData);
		localStorage.setItem("token", data.token);
		return data;
	},

	logout: () => {
		localStorage.removeItem("token");
	},

	getToken: () => localStorage.getItem("token"),
};

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
