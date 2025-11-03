"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			setLoading(false);
			return;
		}

		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, password }),
			});

			const data = await response.json();

			if (response.ok) {
				localStorage.setItem("token", data.token);
				router.push("/projects");
			} else {
				setError(data.error || "Registration failed");
			}
		} catch (err) {
			setError("Network error");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-black flex items-center justify-center p-4">
			{/* Background Effects */}
			<div className="absolute inset-0 opacity-10">
				<div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_50%)] bg-[length:60px_60px]" />
			</div>
			
			{/* Main Container */}
			<div className="w-full max-w-6xl mx-auto">
				{/* Glass Container */}
				<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
					<div className="grid lg:grid-cols-2 min-h-[700px]">
						{/* Left Side - Image */}
						<div className="relative bg-black/50 p-8 flex items-center justify-center">
							<div className="absolute inset-0 bg-gradient-to-br from-gray-800/10 to-gray-900/10" />
							<div className="relative z-10 text-center">
								<div className="w-32 h-32 mx-auto mb-8 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10">
									<svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
										<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</div>
								<h2 className="text-3xl font-bold text-white mb-4">Start Your Journey</h2>
								<p className="text-white/70 text-lg leading-relaxed">
									Join thousands of developers who trust DevTrackr to manage their projects efficiently and effectively.
								</p>
							</div>
						</div>

						{/* Right Side - Form */}
						<div className="p-8 lg:p-12 flex items-center">
							<div className="w-full max-w-md mx-auto">
								{/* Header */}
								<div className="text-center mb-8">
									<h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
									<p className="text-white/70">Join DevTrackr and start managing your projects</p>
								</div>

								{/* Form */}
								<form onSubmit={handleSubmit} className="space-y-5">
									<div>
										<label className="block text-sm font-medium text-white/90 mb-2">
											Full Name
										</label>
										<input
											type="text"
											value={name}
											onChange={(e) => setName(e.target.value)}
											className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all"
											placeholder="Enter your full name"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-white/90 mb-2">
											Email Address
										</label>
										<input
											type="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all"
											placeholder="Enter your email"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-white/90 mb-2">
											Password
										</label>
										<input
											type="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all"
											placeholder="Create a password"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-white/90 mb-2">
											Confirm Password
										</label>
										<input
											type="password"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all"
											placeholder="Confirm your password"
											required
										/>
									</div>

									{error && (
										<div className="text-red-300 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
											{error}
										</div>
									)}

									<button
										type="submit"
										disabled={loading}
										className="w-full py-3 px-6 bg-white text-black rounded-xl font-medium hover:bg-gray-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
									>
										{loading ? "Creating Account..." : "Create Account"}
									</button>
								</form>

								{/* Footer */}
								<div className="text-center mt-8">
									<p className="text-white/70 text-sm">
										Already have an account?{" "}
										<Link
											href="/login"
											className="text-white hover:text-gray-300 font-medium transition-colors"
										>
											Sign in here
										</Link>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}