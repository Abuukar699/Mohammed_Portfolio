import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
    const { isAdmin, login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: '', password: '' });
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Already logged in → go straight to dashboard
    if (isAdmin) return <Navigate to="/admin/dashboard" replace />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        // Simulate network delay for realism
        await new Promise(r => setTimeout(r, 600));
        const result = login(form.email.trim(), form.password);
        setLoading(false);
        if (result.success) {
            navigate('/admin/dashboard', { replace: true });
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden px-4">
            {/* Animated background orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Card */}
                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden">
                    {/* Header gradient band */}
                    <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-8 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                        >
                            <ShieldCheck size={32} className="text-white" />
                        </motion.div>
                        <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
                        <p className="text-white/70 text-sm mt-1">Sign in to manage your portfolio</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-5">
                        {/* Error alert */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                            >
                                <AlertCircle size={16} className="shrink-0" />
                                {error}
                            </motion.div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    id="admin-email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={form.email}
                                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                    placeholder="admin@portfolio.com"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    id="admin-password"
                                    type={showPass ? 'text' : 'password'}
                                    required
                                    autoComplete="current-password"
                                    value={form.password}
                                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-12 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                                >
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <motion.button
                            id="admin-login-btn"
                            type="submit"
                            disabled={loading}
                            whileTap={{ scale: 0.97 }}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 hover:opacity-90 disabled:opacity-60 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Signing in…
                                </>
                            ) : (
                                <>
                                    <ShieldCheck size={16} />
                                    Sign In
                                </>
                            )}
                        </motion.button>

                        <p className="text-center text-xs text-slate-500 pt-2">
                            Access restricted to authorized administrators only.
                        </p>
                        <p className="text-center">
                            <Link to="/" className="text-xs text-slate-500 hover:text-slate-300 transition">
                                ← Back to website
                            </Link>
                        </p>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
