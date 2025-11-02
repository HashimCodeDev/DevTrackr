import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">DevTrackr</h1>
        <p className="text-gray-600 mb-8">Manage your projects efficiently</p>
        <div className="space-x-4">
          <Link href="/login" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Get Started
          </Link>
          <Link href="/login" className="inline-block px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}