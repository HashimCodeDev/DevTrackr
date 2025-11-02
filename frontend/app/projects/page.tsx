"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export type Project = {
	id: string;
	name: string;
	status: "Active" | "In Progress" | "Completed" | "Planning";
	priority: "High" | "Medium" | "Low";
	deadline: string;
};

const columns: ColumnDef<Project>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
				Project Name <ArrowUpDown />
			</Button>
		),
		cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("status") as string;
			const getStatusColor = (status: string) => {
				switch (status) {
					case "Active": return "bg-palette-medium text-palette-darkest";
					case "In Progress": return "bg-palette-light text-palette-darkest";
					case "Completed": return "bg-palette-lightest text-palette-darkest";
					case "Planning": return "bg-palette-dark text-palette-lightest";
					default: return "bg-palette-medium text-palette-darkest";
				}
			};
			return (
				<span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
					{status}
				</span>
			);
		},
	},
	{
		accessorKey: "priority",
		header: "Priority",
		cell: ({ row }) => {
			const priority = row.getValue("priority") as string;
			const getPriorityColor = (priority: string) => {
				switch (priority) {
					case "High": return "text-red-400";
					case "Medium": return "text-palette-light";
					case "Low": return "text-palette-lightest";
					default: return "text-palette-light";
				}
			};
			return <div className={`font-medium ${getPriorityColor(priority)}`}>{priority}</div>;
		},
	},
	{
		accessorKey: "deadline",
		header: "Deadline",
		cell: ({ row }) => <div>{row.getValue("deadline")}</div>,
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const project = row.original;
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem onClick={() => navigator.clipboard.writeText(project.id)}>
							Copy project ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View details</DropdownMenuItem>
						<DropdownMenuItem>Edit project</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export default function Projects() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

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

	const table = useReactTable({
		data: projects,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	if (loading) {
		return (
			<div className="min-h-screen bg-palette-darkest flex items-center justify-center">
				<div className="text-palette-lightest">Loading projects...</div>
			</div>
		);
	}

	const stats = [
		{ title: "Active Projects", value: Array.isArray(projects) ? projects.filter(p => p.status === "Active").length.toString() : "0", change: "+2" },
		{ title: "Completed Projects", value: Array.isArray(projects) ? projects.filter(p => p.status === "Completed").length.toString() : "0", change: "+1" },
		{ title: "In Progress", value: Array.isArray(projects) ? projects.filter(p => p.status === "In Progress").length.toString() : "0", change: "+3" },
		{ title: "Planning", value: Array.isArray(projects) ? projects.filter(p => p.status === "Planning").length.toString() : "0", change: "-1" },
	];

	return (
		<div className="min-h-screen bg-palette-darkest p-8">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold text-palette-lightest mb-8">Dashboard</h1>
				
				{/* Stats Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{stats.map((stat, index) => (
						<div key={index} className="bg-palette-dark/50 border border-palette-medium/20 rounded-lg p-6">
							<h3 className="text-palette-light text-sm font-medium">{stat.title}</h3>
							<div className="flex items-end justify-between mt-2">
								<span className="text-3xl font-bold text-palette-lightest">{stat.value}</span>
								<span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
									{stat.change}
								</span>
							</div>
						</div>
					))}
				</div>

				<h2 className="text-2xl font-bold text-palette-lightest mb-6">All Projects</h2>
				<div className="w-full bg-palette-dark/30 border border-palette-medium/20 rounded-lg p-6">
					<div className="flex items-center py-4">
						<Input
							placeholder="Filter projects..."
							value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
							onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
							className="max-w-sm"
						/>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" className="ml-auto">
									Columns <ChevronDown />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								{table
									.getAllColumns()
									.filter((column) => column.getCanHide())
									.map((column) => (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) => column.toggleVisibility(!!value)}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div className="overflow-hidden rounded-md border border-palette-medium/20">
						<Table>
							<TableHeader>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id} className="bg-palette-dark border-palette-medium/20">
										{headerGroup.headers.map((header) => (
											<TableHead key={header.id} className="text-palette-lightest">
												{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
											</TableHead>
										))}
									</TableRow>
								))}
							</TableHeader>
							<TableBody className="bg-palette-darkest/50">
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row) => (
										<TableRow
											key={row.id}
											data-state={row.getIsSelected() && "selected"}
											className="border-palette-medium/20 hover:bg-palette-medium/10 text-palette-light"
										>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id}>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={columns.length} className="h-24 text-center text-palette-light">
											No results.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
					<div className="flex items-center justify-end space-x-2 py-4">
						<div className="text-palette-light flex-1 text-sm">
							{table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
						</div>
						<div className="space-x-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
							>
								Previous
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
							>
								Next
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}