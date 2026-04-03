"use client";
import { useState, useEffect } from "react";
import { fetchApi } from "@/lib/apiClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("srm_token");
    if (!token) {
      toast.error("Please login to access the dashboard");
      router.push("/login");
    } else {
      setEmail(localStorage.getItem("srm_user") || "");
      setIsInitializing(false);
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetchApi("/posts", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      toast.success("Post created successfully!");
      setFormData({ title: "", content: "" });
      // Redirect to home to see the post
      router.push("/");
    } catch (err) {
      toast.error(err.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  if (isInitializing) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] p-6 bg-gradient-to-br from-neutral-950 via-[#0a0a1a] to-neutral-950">
      <div className="max-w-2xl mx-auto space-y-8 pt-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Creator Dashboard</h1>
          <p className="text-neutral-400 text-sm">Welcome back, <span className="text-indigo-400">{email}</span>. Share something with the SRM Insider community.</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-2xl">
          <h2 className="text-xl font-semibold mb-6">Create New Post</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-200">Post Title</label>
              <input 
                type="text" 
                required
                className="flex h-10 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="What's on your mind?"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-200">Content</label>
              <textarea 
                required
                rows={6}
                className="flex w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-y"
                placeholder="Write your thoughts, share a project, or ask the community..."
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-10 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
