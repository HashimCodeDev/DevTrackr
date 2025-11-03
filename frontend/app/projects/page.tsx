import { columns, Project } from "./columns";
import { DataTable } from "./data-table";
import Navigation from "@/components/Navigation";

async function getData(): Promise<Project[]> {
	const response = await fetch('http://localhost:3000/api/projects', {
		cache: 'no-store',
	});
	
	if (!response.ok) {
		return [];
	}
	
	return response.json();
}

export default async function ProjectPage() {
	const data = await getData();

	return (
		<div className="min-h-screen bg-background">
			<Navigation />
			<div className="container mx-auto py-8 px-4">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-foreground mb-2">Projects</h1>
					<p className="text-muted-foreground">Manage and track your development projects</p>
				</div>
				<div className="bg-card border border-border rounded-lg p-6">
					<DataTable columns={columns} data={data} />
				</div>
			</div>
		</div>
	);
}
