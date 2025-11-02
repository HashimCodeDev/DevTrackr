"use client";
import { useState, useEffect } from "react";

export default function Projects() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await fetch("/api/projects", {
					headers: { Authorization: `Bearer ${token}` },
				});
				if (response.ok) {
					const data = await response.json();
					setProjects(data);
				}
			} catch (error) {
				console.error("Failed to fetch projects:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchProjects();
	}, []);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Active": return "bg-palette-medium text-palette-darkest";
			case "In Progress": return "bg-palette-light text-palette-darkest";
			case "Completed": return "bg-palette-lightest text-palette-darkest";
			case "Planning": return "bg-palette-dark text-palette-lightest";
			default: return "bg-palette-medium text-palette-darkest";
		}
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "High": return "text-red-400";
			case "Medium": return "text-palette-light";
			case "Low": return "text-palette-lightest";
			default: return "text-palette-light";
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-palette-darkest flex items-center justify-center">
				<div className="text-palette-lightest">Loading projects...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-palette-darkest p-8">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold text-palette-lightest mb-8">Projects</h1>
				
				<div className="bg-palette-dark/50 backdrop-blur-sm border border-palette-medium/20 rounded-lg overflow-hidden">
					<table className="w-full">
						<thead className="bg-palette-dark">
							<tr>
								<th className="px-6 py-4 text-left text-sm font-medium text-palette-lightest">ID</th>
								<th className="px-6 py-4 text-left text-sm font-medium text-palette-lightest">Project Name</th>
								<th className="px-6 py-4 text-left text-sm font-medium text-palette-lightest">Status</th>
								<th className="px-6 py-4 text-left text-sm font-medium text-palette-lightest">Priority</th>
								<th className="px-6 py-4 text-left text-sm font-medium text-palette-lightest">Deadline</th>
							</tr>
						</thead>
						<tbody>
							{projects.map((project, index) => (
								<tr 
									key={project.id} 
									className={`border-t border-palette-medium/20 hover:bg-palette-medium/10 transition-colors ${
										index % 2 === 0 ? 'bg-palette-darkest/50' : 'bg-palette-dark/30'
									}`}
								>
									<td className="px-6 py-4 text-sm text-palette-light">{project.id}</td>
									<td className="px-6 py-4 text-sm font-medium text-palette-lightest">{project.name}</td>
									<td className="px-6 py-4">
										<span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
											{project.status}
										</span>
									</td>
									<td className={`px-6 py-4 text-sm font-medium ${getPriorityColor(project.priority)}`}>
										{project.priority}
									</td>
									<td className="px-6 py-4 text-sm text-palette-light">{project.deadline}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}