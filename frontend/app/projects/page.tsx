import { columns, Project } from "./columns";
import { DataTable } from "./data-table";
import Navigation from "@/components/Navigation";

async function getData(): Promise<Project[]> {
	// Fetch data from your API here.
	return [
		{
			id: "728ed52f",
			name: "E-commerce Website",
			dueDate: "2024-02-15",
			status: "PENDING",
		},
		{
			id: "489e1d42",
			name: "Mobile App Development",
			dueDate: "2024-03-20",
			status: "ACTIVE",
		},
		{
			id: "a1b2c3d4",
			name: "Database Migration",
			dueDate: "2024-01-30",
			status: "COMPLETED",
		},
		{
			id: "xyz789ab",
			name: "API Integration",
			dueDate: "2024-02-28",
			status: "ACTIVE",
		},
		{
			id: "def456gh",
			name: "UI/UX Redesign",
			dueDate: "2024-04-10",
			status: "PENDING",
		},
	];
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
