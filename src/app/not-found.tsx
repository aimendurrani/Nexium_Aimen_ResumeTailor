import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Neural Path Not Found | Resume Tailor',
  description: 'Page not found - Return to the neural network',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-rose-50 via-rose-100 to-sky-50">
      {/* Soft Background Glows */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        {/* 404 Error */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-300 to-sky-300 mb-4">
            404
          </h1>
          <div className="text-2xl md:text-3xl text-rose-500 mb-4 uppercase tracking-widest">
            Path Not Found
          </div>
          <p className="text-rose-400 text-lg max-w-lg mx-auto leading-relaxed">
            The data stream has gone dreamy. Initiating a soft reroute through pretty pixels...
          </p>
        </div>

        {/* Cute Error Card */}
        <div className="mb-8">
          <div className="p-6 border-2 border-rose-300 bg-white/60 backdrop-blur-md inline-block rounded-xl shadow-xl">
            <div className="font-mono text-rose-500 text-sm">
              <div>ERROR_CODE: NEURAL_404</div>
              <div>STATUS: DISCONNECTED</div>
              <div>TIMESTAMP: {new Date().toISOString()}</div>
            </div>
          </div>
        </div>

        {/* Navigation Options */}
        <div className="space-y-4">
          <Link 
            href="/" 
            className="inline-block bg-gradient-to-r from-sky-200 to-rose-200 text-rose-700 py-4 px-8 rounded-full border-2 border-rose-300 font-bold uppercase tracking-wider shadow-md hover:scale-105 transition"
          >
            🏡 Return to Base
          </Link>
          
          <div className="text-center">
            <Link 
              href="/dashboard" 
              className="inline-block bg-gradient-to-r from-fuchsia-200 to-rose-200 text-fuchsia-700 py-3 px-6 rounded-full border-2 border-fuchsia-300 font-medium uppercase tracking-wider text-sm hover:scale-105 transition"
            >
              📂 Access Neural Archive
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-rose-400 text-sm">
          <p>If this error persists, give our lovely devs a nudge 💌</p>
          <p className="mt-2">
            Powered by 
            <span className="text-sky-400"> Next.js</span> •
            <span className="text-rose-400"> Soft AI</span> •
            <span className="text-fuchsia-400"> n8n Magic</span>
          </p>
        </div>
      </div>
    </div>
  )
}
