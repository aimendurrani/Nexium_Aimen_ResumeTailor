'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import ReactMarkdown from 'react-markdown';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';

interface Resume {
  _id: string;
  jobTitle: string;
  tailoredResume: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);

  useEffect(() => {
    const getSessionAndResumes = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
        
        if (data.user) {
          try {
            const res = await fetch(`/api/resume?userId=${data.user.id}`);
            
            if (!res.ok) {
              throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            }
            
            const json = await res.json();
            
            if (json.success) {
              setResumes(json.resumes || []);
            } else {
              console.warn('Database fetch failed:', json.error);
              setResumes([]);
              if (json.error.includes('Database error') || json.error.includes('SSL')) {
                console.log('Database temporarily unavailable, working in offline mode');
              } else {
                setError(json.error || 'Failed to fetch resumes');
              }
            }
          } catch (fetchError) {
            console.error('Failed to fetch resumes:', fetchError);
            setResumes([]);
            console.log('Working in offline mode due to database connectivity issues');
          }
        }
      } catch (authError) {
        console.error('Authentication error:', authError);
        setError('Authentication failed');
      }
      
      setLoading(false);
    };
    
    getSessionAndResumes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="cyber-card p-8 text-center bg-pink-100 border border-pink-300 text-pink-700">
          <div className="animate-spin w-8 h-8 border-2 border-pink-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading Sparkles...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="cyber-card p-8 text-center bg-pink-100 border border-pink-300">
          <h2 className="text-2xl font-bold mb-4 text-pink-600">Access Denied</h2>
          <p className="text-purple-500 mb-6">You need to log in to access your lovely dashboard ✨</p>
          <Link href="/" className="cyber-btn-primary bg-gradient-to-r from-pink-400 to-rose-400 text-white hover:from-pink-500 hover:to-rose-500">
            Connect to SparkleNet
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-20 px-4 bg-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-pink-600">🌸 Dream Dashboard</h1>
          <p className="text-xl text-purple-500">
            Manage your AI-tailored resumes in pastel perfection
          </p>
        </div>

        <div className="cyber-card p-6 mb-8 bg-white border border-pink-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
              <span className="text-pink-500 font-medium">Logged In As:</span>
              <span className="text-purple-700 font-bold">{user.email}</span>
            </div>
            <div className="text-sm text-purple-400">
              {resumes.length} Resume{resumes.length !== 1 ? 's' : ''} Stored
            </div>
          </div>
        </div>

        {error ? (
          <div className="cyber-card p-8 text-center bg-red-100 border border-red-300 text-red-600">
            <div className="text-xl mb-4">💔 Oopsie</div>
            <p>{error}</p>
          </div>
        ) : resumes.length === 0 ? (
          <div className="cyber-card p-8 text-center bg-pink-100 border border-pink-300">
            <div className="text-4xl mb-4">🌈</div>
            <h3 className="text-2xl font-bold mb-4 text-pink-500">
              No Resumes Yet
            </h3>
            <p className="text-purple-500 mb-6">
              Start creating your dreamy resume today!
            </p>
            <Link href="/" className="cyber-btn-primary bg-gradient-to-r from-pink-400 to-rose-400 text-white hover:from-pink-500 hover:to-rose-500">
              Create First Resume
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {resumes.map((resume) => (
              <div key={resume._id} className="cyber-card p-6 bg-white border border-pink-200 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold mb-2 text-pink-600">
                      {resume.jobTitle || 'Untitled Position'}
                    </h3>
                    <p className="text-purple-500 text-sm font-mono">
                      Created: {new Date(resume.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="cyber-btn-primary bg-pink-400 text-white hover:bg-pink-500"
                      onClick={() => setSelectedResume(resume)}
                    >
                      View
                    </button>
                    <a
                      href={`data:text/plain;charset=utf-8,${encodeURIComponent(resume.tailoredResume)}`}
                      download={`${resume.jobTitle || 'resume'}_${resume._id}.txt`}
                      className="cyber-btn-secondary bg-purple-200 text-purple-700 hover:bg-purple-300"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedResume && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="cyber-card w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white border border-pink-300 rounded-lg">
              <div className="p-6 border-b border-pink-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold mb-2 text-pink-600">
                      {selectedResume.jobTitle || 'Untitled Position'}
                    </h2>
                    <p className="text-purple-500 text-sm font-mono">
                      {new Date(selectedResume.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    className="text-pink-400 hover:text-pink-600 text-2xl"
                    onClick={() => setSelectedResume(null)}
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-pink-500">
                      Raw Resume
                    </h3>
                    <textarea
                      className="cyber-input w-full h-64 resize-none text-sm border border-pink-300 bg-pink-50 text-purple-700"
                      value={selectedResume.tailoredResume}
                      readOnly
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3 text-purple-500">
                      Rendered Preview
                    </h3>
                    <div className="bg-pink-50 border border-pink-300 rounded-lg p-4 h-64 overflow-y-auto text-purple-700">
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown>{selectedResume.tailoredResume}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
