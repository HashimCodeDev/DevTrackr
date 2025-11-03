"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
	const pathname = usePathname();

	return (
		<nav className="border-b border-border bg-card/50 backdrop-blur-sm">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					<Link
						href="/"
						className="text-xl font-bold text-foreground hover:text-primary transition-colors"
					>
						DevTrackr
					</Link>
					<div className="flex items-center space-x-6">
						<Link
							href="/projects"
							className={`text-sm font-medium transition-colors hover:text-primary ${
								pathname === "/projects"
									? "text-primary"
									: "text-muted-foreground"
							}`}
						>
							Projects
						</Link>
						<Link
							href="/login"
							className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
						>
							Login
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}