"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Project = {
	id: string;
	name: string;
	dueDate: string;
	status: "PENDING" | "COMPLETED" | "ACTIVE";
};

export const columns: ColumnDef<Project>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
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
		enableSorting: true,
	},
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("status") as string;
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="sm">
							{status}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>PENDING</DropdownMenuItem>
						<DropdownMenuItem>ACTIVE</DropdownMenuItem>
						<DropdownMenuItem>COMPLETED</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
	{
		accessorKey: "dueDate",
		header: "Due Date",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const project = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(project.id)}
						>
							Copy project ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Edit project</DropdownMenuItem>
						<DropdownMenuItem>Delete project</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
