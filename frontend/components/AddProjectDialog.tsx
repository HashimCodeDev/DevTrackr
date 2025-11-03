"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { projectsApi } from "@/lib/api";
import { ProjectStatus } from "@/types/project";

export default function AddProjectDialog() {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState<ProjectStatus>("PENDING");
	const [dueDate, setDueDate] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			await projectsApi.createProject({ name, description, status, dueDate });
			setOpen(false);
			setName("");
			setDescription("");
			setStatus("PENDING");
			setDueDate("");
			router.refresh();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
			>
				Add Project
			</button>

			{open && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
					<div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
						<h2 className="text-xl font-bold mb-4">Add New Project</h2>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="block text-sm font-medium mb-2">Project Name</label>
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									className="w-full px-3 py-2 border border-border rounded-md bg-background"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">Description</label>
								<textarea
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className="w-full px-3 py-2 border border-border rounded-md bg-background"
									rows={3}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">Status</label>
								<select
									value={status}
									onChange={(e) => setStatus(e.target.value as ProjectStatus)}
									className="w-full px-3 py-2 border border-border rounded-md bg-background"
								>
									<option value="PENDING">Pending</option>
									<option value="ACTIVE">Active</option>
									<option value="COMPLETED">Completed</option>
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">Due Date</label>
								<input
									type="date"
									value={dueDate}
									onChange={(e) => setDueDate(e.target.value)}
									required
									className="w-full px-3 py-2 border border-border rounded-md bg-background"
								/>
							</div>
							<div className="flex gap-2 justify-end">
								<button
									type="button"
									onClick={() => setOpen(false)}
									className="px-4 py-2 border border-border rounded-md hover:bg-accent"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={loading}
									className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
								>
									{loading ? "Adding..." : "Add"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
}
