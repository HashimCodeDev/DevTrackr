"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";

interface AuthDialogProps {
	isOpen: boolean;
	onClose: () => void;
	mode: "login" | "register";
	onSwitchMode: (mode: "login" | "register") => void;
}

export default function AuthDialog({ isOpen, onClose, mode, onSwitchMode }: AuthDialogProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			if (mode === "register") {
				if (password !== confirmPassword) {
					setError("Passwords do not match");
					setLoading(false);
					return;
				}
				await authApi.register({ username, email, password });
			} else {
				await authApi.login({ email, password });
			}
			router.push("/projects");
		} catch (err) {
			setError(err instanceof Error ? err.message : `${mode === "login" ? "Login" : "Registration"} failed`);
		} finally {
			setLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 opacity-0 animate-[fade-in_0.3s_ease-out_forwards]">
			<div 
				className="absolute inset-0 bg-black/60"
				onClick={onClose}
			/>
			
			<div className="relative w-full max-w-md mx-auto transform translate-y-4 opacity-0 animate-[fade-in_0.3s_ease-out_0.1s_forwards]" style={{animationFillMode: 'forwards'}}>
				<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl p-8">
					<button
						onClick={onClose}
						className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl"
					>
						×
					</button>

					<div className="text-center mb-6">
						<h1 className="text-2xl font-bold text-white mb-2">
							{mode === "login" ? "Sign In" : "Create Account"}
						</h1>
						<p className="text-white/70 text-sm">
							{mode === "login" 
								? "Welcome back! Please sign in to your account"
								: "Join DevTrackr and start managing your projects"
							}
						</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-4">
						{mode === "register" && (
							<input
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
								placeholder="Full name"
								required
							/>
						)}

						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
							placeholder="Email address"
							required
						/>

						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
							placeholder="Password"
							required
						/>

						{mode === "register" && (
							<input
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
								placeholder="Confirm password"
								required
							/>
						)}

						{error && (
							<div className="text-red-300 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
								{error}
							</div>
						)}

						<button
							type="submit"
							disabled={loading}
							className="w-full py-3 px-6 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
						>
							{loading 
								? (mode === "login" ? "Signing in..." : "Creating Account...")
								: (mode === "login" ? "Sign In" : "Create Account")
							}
						</button>
					</form>

					<div className="text-center mt-6">
						<p className="text-white/70 text-sm">
							{mode === "login" ? "Don't have an account? " : "Already have an account? "}
							<button
								onClick={() => onSwitchMode(mode === "login" ? "register" : "login")}
								className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
							>
								{mode === "login" ? "Sign up here" : "Sign in here"}
							</button>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}