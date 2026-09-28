import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ExternalLink, Github, CheckCircle2, Clock,
    Search, SlidersHorizontal, Layers
} from 'lucide-react';
import { useProjects } from '../context/ProjectsContext';

/* ─────────────────────────────────────────────
   STATUS BADGE
───────────────────────────────────────────── */
function StatusBadge({ status }) {
    const isComplete = status === 'completed';
    return (
        <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${isComplete
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
                }`}
        >
            {isComplete ? <CheckCircle2 size={12} /> : <Clock size={12} />}
            {isComplete ? 'Completed' : 'In Progress'}
        </span>
    );
}

/* ─────────────────────────────────────────────
   PROJECT CARD  (read-only — no admin controls)
───────────────────────────────────────────── */
function ProjectCard({ project }) {
    const fallback = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 dark:border-slate-700 flex flex-col h-full"
        >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
                {/* Hover overlay with public links only */}
                <div className="absolute inset-0 bg-slate-900/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center gap-3 backdrop-blur-sm">
                    {project.demoUrl && (
                        <motion.a href={project.demoUrl} target="_blank" rel="noreferrer"
                            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-900 hover:text-primary-600 transition-colors shadow-lg" title="Live Demo">
                            <ExternalLink size={18} />
                        </motion.a>
                    )}
                    {project.githubUrl && (
                        <motion.a href={project.githubUrl} target="_blank" rel="noreferrer"
                            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-900 hover:text-primary-600 transition-colors shadow-lg" title="GitHub">
                            <Github size={18} />
                        </motion.a>
                    )}
                </div>

                <img
                    src={project.image || fallback}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    onError={e => { e.target.src = fallback; }}
                />

                {/* Category chip */}
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-slate-800 dark:text-white shadow-md z-20">
                    {project.category}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Title row + status badge */}
                <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
                        {project.title}
                    </h3>
                    <StatusBadge status={project.status} />
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-sm mb-5 leading-relaxed line-clamp-3 flex-grow">
                    {project.description}
                </p>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
                        {project.tags.map(tag => (
                            <div key={tag} className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 px-2.5 py-1 rounded-md border border-slate-100 dark:border-slate-700">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                                {tag}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   PUBLIC PORTFOLIO PAGE
───────────────────────────────────────────── */
const Portfolio = () => {
    const { projects } = useProjects();

    const [categoryFilter, setCategoryFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [search, setSearch] = useState('');

    /* ── Derived data ── */
    const categories = ['All', ...new Set(projects.map(p => p.category))];
    const completedCount = projects.filter(p => p.status === 'completed').length;
    const incompleteCount = projects.filter(p => p.status === 'incomplete').length;

    const filteredProjects = projects.filter(p => {
        const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
        const matchStatus = statusFilter === 'All' || p.status === statusFilter;
        const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchStatus && matchSearch;
    });

    return (
        <div className="pt-12 px-6 pb-20 overflow-hidden relative min-h-screen">
            {/* Background Orbs */}
            <div className="absolute top-20 left-0 w-96 h-96 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-20 right-0 w-96 h-96 bg-secondary-200/20 dark:bg-secondary-900/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="max-w-7xl mx-auto">
                {/* ── Header ── */}
                <div className="text-center mb-12">
                    <span className="text-primary-600 dark:text-primary-400 font-semibold tracking-wider text-sm uppercase">Portfolio</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2 mb-4">Selected Works</h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        A curated collection of projects that demonstrate my passion for building high-quality digital experiences.
                    </p>
                </div>

                {/* ── Stats Row ── */}
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    {[
                        { label: 'Total Projects', value: projects.length, color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-50 dark:bg-primary-900/20' },
                        { label: 'Completed', value: completedCount, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
                        { label: 'In Progress', value: incompleteCount, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
                    ].map(stat => (
                        <div key={stat.label} className={`flex flex-col items-center px-6 py-3 rounded-2xl ${stat.bg} border border-slate-100 dark:border-slate-700`}>
                            <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{stat.label}</span>
                        </div>
                    ))}
                </div>

                {/* ── Controls Bar ── */}
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
                    {/* Search */}
                    <div className="relative w-full lg:w-72">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search projects…"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                        />
                    </div>

                    {/* Status filter pills */}
                    <div className="flex items-center gap-2 flex-wrap justify-center">
                        <SlidersHorizontal size={15} className="text-slate-400" />
                        {['All', 'completed', 'incomplete'].map(s => (
                            <button key={s}
                                onClick={() => setStatusFilter(s)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${statusFilter === s
                                    ? s === 'completed' ? 'bg-emerald-500 text-white shadow-sm'
                                        : s === 'incomplete' ? 'bg-amber-500 text-white shadow-sm'
                                            : 'bg-primary-600 text-white shadow-sm'
                                    : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600 hover:border-primary-300'
                                    }`}>
                                {s === 'All' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Category Filter Tabs ── */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${categoryFilter === cat
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 border border-slate-100 dark:border-slate-700'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* ── Project Grid ── */}
                {filteredProjects.length === 0 ? (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-5">
                            <Layers size={32} className="text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No projects found</h3>
                        <p className="text-slate-400 dark:text-slate-500 text-sm">Try adjusting your filters.</p>
                    </motion.div>
                ) : (
                    <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {filteredProjects.map(project => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Portfolio;
