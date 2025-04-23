'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-12">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 text-lg mb-8">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => router.push('/')}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
      >
        Go Home
      </button>
    </div>
  );
}
