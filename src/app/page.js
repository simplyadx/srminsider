import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-indigo-500/30">
      {/* Navbar */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              S
            </div>
            <span className="font-semibold tracking-tight text-lg">SRM Insider</span>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-neutral-400">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              API Online
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-neutral-300">
            <span>✨</span> Recruitment Task 2
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            Backend System <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Ready for Production
            </span>
          </h1>
          <p className="text-lg text-neutral-400 leading-relaxed">
            A fully secure, scalable RESTful API built with Next.js App Router, Prisma ORM, and MySQL. Featuring strict JWT authentication and role-based access.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <a href="/api/posts" className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition">
              Test GET /posts
            </a>
            <a href="https://www.linkedin.com/company/srm-insider-community/" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-xl bg-white/5 font-semibold border border-white/10 hover:bg-white/10 transition">
              About SRM Insider
            </a>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-6 pt-8">
          <FeatureCard 
            title="JWT Authentication" 
            desc="Secure stateless sessions with bcrypt hashed passwords and token verification."
            icon="🔐"
          />
          <FeatureCard 
            title="MySQL & Prisma" 
            desc="Relational integrity using MySQL with modern schema modeling via Prisma ORM."
            icon="🗄️"
          />
          <FeatureCard 
            title="RBAC Guard" 
            desc="Route handlers strictly gated verifying User/Admin roles prior to transactions."
            icon="🛡️"
          />
        </div>

        {/* API Endpoints Terminal */}
        <div className="rounded-2xl border border-white/10 bg-black overflow-hidden shadow-2xl">
          <div className="border-b border-white/10 bg-white/5 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="mx-auto text-xs font-mono text-neutral-500">API Documentation</div>
          </div>
          <div className="p-6 font-mono text-sm space-y-4">
            <Endpoint method="POST" path="/api/auth/signup" desc="Register a new account" />
            <Endpoint method="POST" path="/api/auth/login" desc="Login to receive JWT token" />
            <Endpoint method="GET" path="/api/auth/me" desc="Get current profile (Protected)" />
            <div className="h-px w-full bg-white/5 my-4"></div>
            <Endpoint method="GET" path="/api/posts" desc="List all posts (Supports ?q=, &page=)" />
            <Endpoint method="POST" path="/api/posts" desc="Create new post (Protected)" />
            <Endpoint method="GET" path="/api/posts/:id" desc="Get single post" />
            <Endpoint method="PUT" path="/api/posts/:id" desc="Update post (Owner/Admin)" />
            <Endpoint method="DELETE" path="/api/posts/:id" desc="Delete post (Owner/Admin)" />
            <div className="h-px w-full bg-white/5 my-4"></div>
            <Endpoint method="GET" path="/api/admin/users" desc="List all system users (Admin Only)" />
          </div>
        </div>

      </main>
    </div>
  );
}

function FeatureCard({ title, desc, icon }) {
  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition group cursor-default">
      <div className="text-3xl mb-4 group-hover:scale-110 transition-transform origin-left">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function Endpoint({ method, path, desc }) {
  const color = 
    method === 'GET' ? 'text-blue-400' : 
    method === 'POST' ? 'text-green-400' : 
    method === 'PUT' ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 hover:bg-white/5 p-2 rounded-lg transition-colors -mx-2">
      <div className="flex items-center gap-4 w-64 shrink-0">
        <span className={`font-bold w-14 ${color}`}>{method}</span>
        <span className="text-neutral-300">{path}</span>
      </div>
      <span className="text-neutral-500 font-sans hidden sm:block">..........</span>
      <span className="text-neutral-400">{desc}</span>
    </div>
  );
}
