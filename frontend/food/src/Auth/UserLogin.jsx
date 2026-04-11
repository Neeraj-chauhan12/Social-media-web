import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useLoginMutation } from '../features/api/AuthApi';

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await login({ email, password }).unwrap();
      toast.success(result?.message || "Login successful!");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-sky-100 to-indigo-100 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950 flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/70 bg-white/90 shadow-2xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90">
        <div className="absolute top-0 left-0 h-44 w-44 rounded-full bg-blue-300/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-indigo-300/30 blur-3xl" />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <section className="relative flex flex-col justify-center gap-6 bg-gradient-to-br from-blue-600 to-indigo-600 px-8 py-12 text-white sm:px-10 lg:px-12">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-200">Welcome back</p>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Sign in to InstaLike</h1>
              <p className="max-w-md text-sm text-sky-100/90 sm:text-base">
                Access your feed, create new reels, and stay connected with your community in a polished, modern experience.
              </p>
            </div>

            <div className="space-y-3 text-sm text-sky-100/90">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-lg">✓</span>
                <span>Fast login with email</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-lg">⚡</span>
                <span>Polished and responsive layout</span>
              </div>
            </div>
          </section>

          <section className="relative p-8 sm:p-10">
            <div className="mb-6 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">Login to continue</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">User Login</h2>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-sky-500 dark:focus:bg-slate-900 dark:focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-sky-500 dark:focus:bg-slate-900 dark:focus:ring-sky-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400 dark:hover:bg-blue-500"
              >
                {isLoading ? 'Signing in...' : 'Login'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
              <span>Don't have an account? </span>
              <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-sky-300">
                Register now
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
