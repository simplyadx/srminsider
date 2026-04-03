"use client";
import { useState, useEffect } from "react";
import { fetchApi } from "@/lib/apiClient";
import { formatDistanceToNow } from "date-fns";
import { Search } from "lucide-react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadPosts = async (query = "") => {
    setLoading(true);
    try {
      const data = await fetchApi(`/posts?q=${query}&limit=20`);
      setPosts(data.posts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(search);
  }, [search]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans p-6 pb-24">
      <main className="max-w-3xl mx-auto space-y-12">
        {/* Header section matching LinkedIn branding */}
        <div className="text-center space-y-4 pt-12 pb-6 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-300 tracking-widest uppercase">
            Built by Students
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Innovate | Build | <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Connect</span>
          </h1>
          <p className="text-neutral-400 max-w-xl mx-auto text-sm leading-relaxed">
            Welcome to the SRM Insider Community Feed. Discover tools, share ideas, and connect with other developers at SRM University.
          </p>
          
          <div className="relative max-w-md mx-auto pt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
            <input 
              type="text" 
              placeholder="Search posts..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center text-neutral-500 py-12 animate-pulse">Loading community posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-neutral-500 py-12">No posts found. Be the first to share something!</div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center font-bold text-sm border border-white/10">
                      {post.user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-neutral-200">{post.user?.name || "Unknown User"}</h4>
                      <p className="text-xs text-neutral-500">
                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-neutral-400 text-sm whitespace-pre-wrap leading-relaxed">
                  {post.content}
                </p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
