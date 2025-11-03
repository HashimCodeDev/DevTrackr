import { columns, Project } from "./columns";
import { DataTable } from "./data-table";
import Navigation from "@/components/Navigation";
import AddProjectDialog from "@/components/AddProjectDialog";
import { projectsApi } from "@/lib/api";

async function getData(): Promise<Project[]> {
	try {
		return await projectsApi.getProjects();
	} catch {
		return [];
	}
}

export default async function ProjectPage() {
	const data = await getData();

	return (
		<div className="min-h-screen bg-background">
			<Navigation />
			<div className="container mx-auto py-8 px-4">
				<div className="mb-8 flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-foreground mb-2">Projects</h1>
						<p className="text-muted-foreground">Manage and track your development projects</p>
					</div>
					<AddProjectDialog />
				</div>
				<div className="bg-card border border-border rounded-lg p-6">
					<DataTable columns={columns} data={data} />
				</div>
			</div>
		</div>
	);
}
