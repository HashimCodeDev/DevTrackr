"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PixelBlast from "@/components/PixelBlast";
import SpotlightCard from "@/components/SpotlightCard";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();

			if (response.ok) {
				localStorage.setItem("token", data.token);
				router.push("/projects");
			} else {
				setError(data.error || "Login failed");
			}
		} catch (err) {
			setError("Network error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="relative min-h-screen bg-custom-dark select-none overflow-hidden">
			{/* Vignette Effect */}
			<div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60 pointer-events-none z-20" />

			{/* PixelBlast Background */}
			<div className="absolute inset-0">
				<PixelBlast
					variant="circle"
					pixelSize={6}
					color="#C1E8FF"
					patternScale={3}
					patternDensity={1.2}
					pixelSizeJitter={0.5}
					enableRipples
					rippleSpeed={0.4}
					rippleThickness={0.12}
					rippleIntensityScale={1.5}
					speed={0.6}
					edgeFade={0.25}
					transparent
				/>
			</div>

			{/* Navigation */}
			<div className="absolute top-8 left-0 w-full h-15 z-30 pointer-events-none">
				<div className="mx-auto w-[90%] md:w-[60%] h-full rounded-[50px] py-4 px-6 flex items-center justify-between bg-white/5 backdrop-blur-[10px] border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
					<Link
						href="/"
						className="text-white font-semibold text-xl pointer-events-auto hover:text-blue-200 transition-colors"
					>
						DevTrackr
					</Link>
					<div className="hidden md:flex items-center gap-6 font-semibold">
						<span className="text-white text-base">Home</span>
						<span className="text-white text-base">Features</span>
						<span className="text-white text-base">About</span>
					</div>
				</div>
			</div>

			{/* Login Form */}
			<div className="absolute top-0 left-0 flex items-center justify-center w-full h-full z-10">
				<SpotlightCard
					className="w-full max-w-md mx-4 bg-[#021024]/90 backdrop-blur-[10px] border-[#5483B3]/20"
					spotlightColor="rgba(193, 232, 255, 0.15)"
				>
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
						<p className="text-white/70">Sign in to your DevTrackr account</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label className="block text-sm font-medium text-white/90 mb-2">
								Username
							</label>
							<input
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="w-full px-4 py-3 bg-[#052659]/50 backdrop-blur-[10px] border border-[#5483B3]/30 rounded-[12px] text-white placeholder-[#7DA0CA] focus:outline-none focus:ring-2 focus:ring-[#C1E8FF]/50 focus:border-[#C1E8FF]/50 transition-all"
								placeholder="Enter your username"
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
								className="w-full px-4 py-3 bg-[#052659]/50 backdrop-blur-[10px] border border-[#5483B3]/30 rounded-[12px] text-white placeholder-[#7DA0CA] focus:outline-none focus:ring-2 focus:ring-[#C1E8FF]/50 focus:border-[#C1E8FF]/50 transition-all"
								placeholder="Enter your password"
								required
							/>
						</div>

						{error && (
							<div className="text-rose-300 text-sm bg-rose-500/10 border border-rose-500/20 rounded-[8px] px-3 py-2">
								{error}
							</div>
						)}

						<button
							type="submit"
							disabled={loading}
							className="w-full py-3 px-6 bg-gradient-to-r from-[#5483B3] to-[#7DA0CA] text-[#021024] rounded-[12px] text-base font-medium hover:from-[#7DA0CA] hover:to-[#C1E8FF] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 transition-all duration-200 shadow-lg hover:shadow-[#C1E8FF]/25"
						>
							{loading ? "Signing in..." : "Sign In"}
						</button>
					</form>

					<div className="text-center mt-6">
						<p className="text-white/70 text-sm">
							Don&apos;t have an account?{" "}
							<Link
								href="/register"
								className="text-[#7DA0CA] hover:text-[#C1E8FF] font-medium transition-colors"
							>
								Create Account
							</Link>
						</p>
					</div>
				</SpotlightCard>
			</div>
		</div>
	);
}
