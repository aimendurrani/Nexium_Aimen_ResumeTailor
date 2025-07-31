'use client';

import { useSearchParams } from 'next/navigation';

export default function AuthCodeError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-gradient-to-br from-pink-200/40 to-purple-200/30 backdrop-blur-xl border border-pink-400/30 rounded-2xl p-8 shadow-lg">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-300/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-pink-600">Authentication Error</h1>
          <p className="text-gray-700 mb-6">
            OOPS!! There was an issue with your magic link, it might be expired or invalid
          </p>
          {error && (
            <div className="bg-white/70 p-4 rounded-lg mb-6 border border-pink-200">
              <p className="text-sm text-pink-700 mb-2">Error Details:</p>
              <p className="text-sm text-pink-500 font-mono">{error}</p>
            </div>
          )}
          <div className="space-y-4">
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-medium py-3 px-6 rounded-lg hover:from-pink-500 hover:to-purple-500 transition-all duration-200"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.href = '/api/debug'}
              className="w-full bg-white/80 text-pink-600 font-medium py-2 px-6 rounded-lg hover:bg-pink-100 transition-all duration-200 text-sm"
            >
              Debug Info
            </button>
            <p className="text-sm text-pink-700">
              please request a new magic link if the problem continues 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
