import { columns, Project } from "./columns";
import { DataTable } from "./data-table";

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
		<div className="flex flex-col h-screen bg-black/80">
			<div className="flex flex-col relative top-20 h-3/4 w-3/4 mx-auto p-10 rounded-2xl bg-black/50 text-white">
				<DataTable columns={columns} data={data} />
			</div>
		</div>
	);
}
