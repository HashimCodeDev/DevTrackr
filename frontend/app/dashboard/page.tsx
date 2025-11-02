"use client";

export default function Dashboard() {
	const stats = [
		{ title: "Active Projects", value: "12", change: "+2" },
		{ title: "Completed Tasks", value: "48", change: "+8" },
		{ title: "Team Members", value: "6", change: "+1" },
		{ title: "Pending Reviews", value: "3", change: "-2" },
	];

	const recentProjects = [
		{ name: "E-commerce Platform", status: "Active", progress: 75 },
		{ name: "Mobile App", status: "In Progress", progress: 45 },
		{ name: "API Gateway", status: "Review", progress: 90 },
	];

	return (
		<div className="min-h-screen bg-palette-darkest">
			{/* Header */}
			<div className="bg-palette-dark/50 border-b border-palette-medium/20 px-8 py-6">
				<h1 className="text-3xl font-bold text-palette-lightest">Dashboard</h1>
				<p className="text-palette-light mt-1">Welcome back to DevTrackr</p>
			</div>

			<div className="p-8">
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

				{/* Recent Projects */}
				<div className="bg-palette-dark/50 border border-palette-medium/20 rounded-lg p-6">
					<h2 className="text-xl font-semibold text-palette-lightest mb-6">Recent Projects</h2>
					<div className="space-y-4">
						{recentProjects.map((project, index) => (
							<div key={index} className="flex items-center justify-between p-4 bg-palette-darkest/50 rounded-lg">
								<div className="flex-1">
									<h3 className="font-medium text-palette-lightest">{project.name}</h3>
									<span className={`inline-block px-2 py-1 rounded text-xs mt-1 ${
										project.status === 'Active' ? 'bg-palette-medium text-palette-darkest' :
										project.status === 'In Progress' ? 'bg-palette-light text-palette-darkest' :
										'bg-palette-lightest text-palette-darkest'
									}`}>
										{project.status}
									</span>
								</div>
								<div className="flex items-center gap-3">
									<div className="w-24 bg-palette-dark rounded-full h-2">
										<div 
											className="bg-palette-medium h-2 rounded-full" 
											style={{ width: `${project.progress}%` }}
										/>
									</div>
									<span className="text-palette-light text-sm w-12">{project.progress}%</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}