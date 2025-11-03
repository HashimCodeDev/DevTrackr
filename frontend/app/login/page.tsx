"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authApi } from "@/lib/api";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			await authApi.login({ email, password });
			router.push("/projects");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-black flex items-center justify-center p-4">
			{/* Background Effects */}
			<div className="absolute inset-0 opacity-10">
				<div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_50%)] bg-size-[60px_60px]" />
			</div>

			{/* Main Container */}
			<div className="w-full max-w-6xl mx-auto">
				{/* Glass Container */}
				<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
					<div className="grid lg:grid-cols-2 min-h-[600px]">
						{/* Left Side - Image */}
						<div className="relative bg-black/50 p-8 flex items-center justify-center">
							<div className="absolute inset-0 bg-linear-to-br from-gray-800/10 to-gray-900/10" />
							<div className="relative z-10 text-center">
								<div className="w-120 mx-auto mb-8 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10">
									<Image
										src="/login.jpg"
										alt="login"
										className="rounded-2xl"
										width={500}
										height={300}
									/>
								</div>
								<h2 className="text-3xl font-bold text-white mb-4">
									Welcome to DevTrackr
								</h2>
								<p className="text-white/70 text-lg leading-relaxed">
									Track your development projects with ease. Manage tasks,
									monitor progress, and collaborate with your team.
								</p>
							</div>
						</div>

						{/* Right Side - Form */}
						<div className="p-8 lg:p-12 flex items-center">
							<div className="w-full max-w-md mx-auto">
								{/* Header */}
								<div className="text-center mb-8">
									<h1 className="text-3xl font-bold text-white mb-2">
										Sign In
									</h1>
									<p className="text-white/70">
										Welcome back! Please sign in to your account
									</p>
								</div>

								{/* Form */}
								<form onSubmit={handleSubmit} className="space-y-6">
									<div>
										<label className="block text-sm font-medium text-white/90 mb-2">
											Email Address
										</label>
										<input
											type="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
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
											className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
											placeholder="Enter your password"
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
										className="w-full py-3 px-6 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
									>
										{loading ? "Signing in..." : "Sign In"}
									</button>
								</form>

								{/* Footer */}
								<div className="text-center mt-8">
									<p className="text-white/70 text-sm">
										Don&apos;t have an account?{" "}
										<Link
											href="/register"
											className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
										>
											Sign up here
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
