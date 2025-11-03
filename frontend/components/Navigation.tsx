"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navigation() {
	const pathname = usePathname();
	const router = useRouter();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		setIsLoggedIn(!!token);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('token');
		setIsLoggedIn(false);
		router.push('/login');
	};

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
						{isLoggedIn ? (
							<button
								onClick={handleLogout}
								className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
							>
								Logout
							</button>
						) : (
							<Link
								href="/login"
								className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
							>
								Login
							</Link>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}