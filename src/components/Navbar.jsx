"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, User, PlusCircle } from "lucide-react";

export function Navbar() {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check if token exists
    const token = typeof window !== 'undefined' ? localStorage.getItem('srm_token') : null;
    const email = typeof window !== 'undefined' ? localStorage.getItem('srm_user') : null;
    if (token) {
      setIsLogged(true);
      setUserName(email?.split('@')[0] || "User");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('srm_token');
    localStorage.removeItem('srm_user');
    setIsLogged(false);
    router.push("/login");
  };

  return (
    <header className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
            S
          </div>
          <span className="font-semibold tracking-tight text-lg text-white">SRM Insider</span>
        </Link>
        <div className="flex items-center gap-4">
          {isLogged ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-neutral-300 hover:text-white flex items-center gap-1.5 transition">
                <User size={16} /> <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="text-sm font-medium text-red-400 hover:text-red-300 flex items-center gap-1.5 transition ml-2"
              >
                <LogOut size={16} /> <span className="hidden sm:inline">Log out</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-neutral-300 hover:text-white transition">
                Log In
              </Link>
              <Link href="/signup" className="text-sm px-4 py-1.5 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
