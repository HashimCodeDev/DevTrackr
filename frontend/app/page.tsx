"use client";
import { useState } from "react";
import PixelBlast from "@/components/PixelBlast";
import SplitText from "@/components/SplitText";

export default function Home() {
	return (
		<div className="relative min-h-screen bg-custom-dark select-none">
			<PixelBlast
				variant="circle"
				pixelSize={6}
				color="#c1e8ff"
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

			{/* Navigation */}
			<div className="absolute top-8 left-0 w-full h-15 z-0 pointer-events-none">
				<div className="mx-auto w-[90%] md:w-[60%] h-full rounded-[50px] py-4 px-6 flex items-center justify-between bg-white/5 backdrop-blur-[10px] border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
					<div className="text-white font-semibold text-lg">DevTrackr</div>
					<div className="hidden md:flex items-center gap-6 font-semibold">
						<span className="text-white text-sm">Home</span>
						<span className="text-white text-sm">Features</span>
						<span className="text-white text-sm">About</span>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="absolute top-0 left-0 flex items-center justify-center flex-col w-full h-full z-10 pointer-events-none">
				{/* Pill */}
				<div className="text-white w-auto px-4 h-[34px] flex text-sm justify-center items-center rounded-[50px] font-medium bg-white/5 backdrop-blur-[10px] border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
					<span className="ml-1">🚀 New Project Tracker</span>
				</div>

				{/* Headline */}
				<SplitText
					text="Track Your Development Journey"
					className="mt-4 text-white text-[clamp(2rem,4vw,2.6rem)] leading-[1.2] text-center tracking-[-2px] max-w-[18ch] font-bold"
					delay={100}
					duration={0.6}
					ease="power3.out"
					splitType="chars"
					from={{ opacity: 1, y: 0 }}
					to={{ opacity: 1, y: 0 }}
					textAlign="center"
					tag="h1"
				/>

				{/* CTA Buttons */}
				<div className="flex gap-4 mt-8 items-center pointer-events-auto">
					<button className="px-6 md:px-10 py-2 md:py-3 bg-white text-black rounded-[50px] text-sm font-medium border-none cursor-pointer hover:bg-gray-100 hover:-translate-y-0.5 transition-all duration-200">
						Get Started
					</button>
					<button className="px-6 md:px-10 py-2 md:py-3 rounded-[50px] text-sm font-medium bg-white/5 backdrop-blur-[10px] border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] text-white/50 cursor-pointer hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200">
						Learn More
					</button>
				</div>
			</div>
		</div>
	);
}
