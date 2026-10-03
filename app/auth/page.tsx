"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CircuitBoard, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

export default function AuthPage() {
  const router = useRouter();
  
  const supabase = createClient();

console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(
  "SUPABASE KEY EXISTS:",
  !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setMessage(error.message);
          return;
        }

        router.push("/dashboard");
        router.refresh();
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });

        if (error) {
          setMessage(error.message);
          return;
        }

        setMessage(
          "Account created! Check your email to confirm your account."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F7FB] text-[#18181B]">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">

          {/* Back */}
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-[#71717A] transition hover:text-[#7C3AED]"
          >
            <ArrowLeft size={16} />
            Back to CircuitCraft
          </Link>

          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7C3AED] text-white shadow-lg shadow-purple-200">
              <CircuitBoard size={28} />
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              {isLogin ? "Welcome back" : "Create your workspace"}
            </h1>

            <p className="mt-2 text-sm text-[#71717A]">
              {isLogin
                ? "Continue building your circuits."
                : "Start your personal digital laboratory."}
            </p>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-[#E4E4E7] bg-white p-7 shadow-xl shadow-purple-100/40">

            {/* Toggle */}
            <div className="mb-7 grid grid-cols-2 rounded-xl bg-[#F4F4F5] p-1">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setMessage("");
                }}
                className={`rounded-lg py-2.5 text-sm font-medium transition ${
                  isLogin
                    ? "bg-white text-[#7C3AED] shadow-sm"
                    : "text-[#71717A]"
                }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setMessage("");
                }}
                className={`rounded-lg py-2.5 text-sm font-medium transition ${
                  !isLogin
                    ? "bg-white text-[#7C3AED] shadow-sm"
                    : "text-[#71717A]"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {!isLogin && (
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Your name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ninad Kamde"
                    required
                    className="w-full rounded-xl border border-[#E4E4E7] bg-white px-4 py-3 outline-none transition placeholder:text-[#A1A1AA] focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#EDE9FE]"
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-[#E4E4E7] bg-white px-4 py-3 outline-none transition placeholder:text-[#A1A1AA] focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#EDE9FE]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-[#E4E4E7] bg-white px-4 py-3 outline-none transition placeholder:text-[#A1A1AA] focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#EDE9FE]"
                />
              </div>

              {message && (
                <div className="rounded-xl bg-[#F5F3FF] px-4 py-3 text-sm text-[#6D28D9]">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#7C3AED] py-3.5 font-semibold text-white transition hover:bg-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Please wait...
                  </>
                ) : isLogin ? (
                  "Login to CircuitCraft"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-[#A1A1AA]">
            Your circuits and activity will belong to your personal workspace.
          </p>
        </div>
      </div>
    </main>
  );
}