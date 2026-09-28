import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import xirfadleImage from '../assets/xirfadle-center.png'
import {
    ExternalLink, Github, Plus, X, CheckCircle2, Clock,
    Trash2, Pencil, Upload, Tag, Layers, Image as ImageIcon,
    Link as LinkIcon, Search, SlidersHorizontal, CheckCheck
} from 'lucide-react';

/* ─────────────────────────────────────────────
   SEED DATA  (shown only when localStorage is empty)
───────────────────────────────────────────── */
const SEED_PROJECTS = [
    {
        id: 1,
        title: 'Xirfadle-center',
        category: 'E-Learning',
        image: xirfadleImage,
        description: 'A comprehensive learning management system for schools with student dashboards, quizzes, and grade tracking.',
        tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
        demoUrl: 'https://xirfadle-center.netlify.app/',
        githubUrl: 'https://github.com/Abuukar699',
        status: 'completed',
        seeded: true,
    },
    {
        id: 2,
        title: 'Luxe Interiors',
        category: 'Business',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000',
        description: 'A minimal, high-performance portfolio website for an award-winning interior design firm.',
        tags: ['Next.js', 'Tailwind', 'Framer Motion'],
        demoUrl: '',
        githubUrl: '',
        status: 'completed',
        seeded: true,
    },
    {
        id: 3,
        title: 'CryptoTracker',
        category: 'Fintech',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
        description: 'Real-time cryptocurrency dashboard with live price charts, news aggregation, and portfolio tracking.',
        tags: ['React', 'Chart.js', 'CoinGecko API'],
        demoUrl: '',
        githubUrl: '',
        status: 'incomplete',
        seeded: true,
    },
    {
        id: 4,
        title: 'GreenEat Delivery',
        category: 'E-commerce',
        image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1000',
        description: 'A food delivery app interface featuring real-time order tracking, cart management, and payment integration.',
        tags: ['React Native', 'Firebase', 'Redux'],
        demoUrl: '',
        githubUrl: '',
        status: 'completed',
        seeded: true,
    },
    {
        id: 5,
        title: 'TaskMaster Pro',
        category: 'SaaS',
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1000',
        description: 'Productivity tool for teams with Kanban boards, drag-and-drop tasks, and time tracking features.',
        tags: ['Vue.js', 'Tailwind', 'Supabase'],
        demoUrl: '',
        githubUrl: '',
        status: 'incomplete',
        seeded: true,
    },
    {
        id: 6,
        title: 'TravelWise',
        category: 'Business',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1000',
        description: 'AI-powered travel itinerary planner that suggests destinations based on user preferences and budget.',
        tags: ['React', 'OpenAI API', 'Mapbox'],
        demoUrl: '',
        githubUrl: '',
        status: 'completed',
        seeded: true,
    },
];

const STORAGE_KEY = 'portfolio_projects';

const emptyForm = {
    title: '',
    category: '',
    image: '',
    description: '',
    tags: '',
    demoUrl: '',
    githubUrl: '',
    status: 'incomplete',
};

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
            {isComplete ? 'Completed' : 'Incomplete'}
        </span>
    );
}

/* ─────────────────────────────────────────────
   MODAL FORM
───────────────────────────────────────────── */
function ProjectModal({ project, onClose, onSave }) {
    const [form, setForm] = useState(project || emptyForm);
    const [errors, setErrors] = useState({});
    const fileRef = useRef();
    const isEdit = !!project;

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = 'Title is required.';
        if (!form.category.trim()) e.category = 'Category is required.';
        if (!form.description.trim()) e.description = 'Description is required.';
        return e;
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => setForm(f => ({ ...f, image: ev.target.result }));
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        onSave({
            ...form,
            tags: typeof form.tags === 'string'
                ? form.tags.split(',').map(t => t.trim()).filter(Boolean)
                : form.tags,
            id: project?.id ?? Date.now(),
        });
    };

    // Prevent body scroll while modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    const field = (label, key, type = 'text', placeholder = '') => (
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
            <input
                type={type}
                value={form[key]}
                onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(er => ({ ...er, [key]: undefined })); }}
                placeholder={placeholder}
                className={`w-full px-4 py-2.5 rounded-xl border ${errors[key] ? 'border-red-400' : 'border-slate-200 dark:border-slate-600'} bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition`}
            />
            {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Panel */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative z-10 w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden"
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-primary-600 to-secondary-500">
                    <div className="flex items-center gap-3">
                        {isEdit ? <Pencil size={20} className="text-white/80" /> : <Upload size={20} className="text-white/80" />}
                        <h2 className="text-xl font-bold text-white">{isEdit ? 'Edit Project' : 'Upload Project'}</h2>
                    </div>
                    <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition">
                        <X size={18} />
                    </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {field('Project Title *', 'title', 'text', 'e.g. My Awesome App')}
                        {field('Category *', 'category', 'text', 'e.g. SaaS, Fintech, E-Learning')}
                    </div>

                    {field('Description *', 'description', 'text', 'Brief description of the project')}

                    {/* Tags field */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            <span className="flex items-center gap-1"><Tag size={13} /> Tech Stack / Tags</span>
                        </label>
                        <input
                            type="text"
                            value={typeof form.tags === 'string' ? form.tags : form.tags.join(', ')}
                            onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                            placeholder="React, Node.js, MongoDB (comma-separated)"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            <span className="flex items-center gap-1"><ImageIcon size={13} /> Project Image</span>
                        </label>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={typeof form.image === 'string' && !form.image.startsWith('data:') ? form.image : ''}
                                onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                                placeholder="Paste image URL…"
                                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                            />
                            <button type="button" onClick={() => fileRef.current?.click()}
                                className="px-4 py-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-700 text-sm font-medium hover:bg-primary-100 transition flex items-center gap-2">
                                <Upload size={14} /> Upload
                            </button>
                            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                        </div>
                        {form.image && (
                            <div className="mt-3 rounded-xl overflow-hidden h-32 bg-slate-100 dark:bg-slate-800">
                                <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} />
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                <span className="flex items-center gap-1"><LinkIcon size={13} /> Live Demo URL</span>
                            </label>
                            <input type="url" value={form.demoUrl}
                                onChange={e => setForm(f => ({ ...f, demoUrl: e.target.value }))}
                                placeholder="https://your-demo.com"
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                <span className="flex items-center gap-1"><Github size={13} /> GitHub URL</span>
                            </label>
                            <input type="url" value={form.githubUrl}
                                onChange={e => setForm(f => ({ ...f, githubUrl: e.target.value }))}
                                placeholder="https://github.com/..."
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Project Status</label>
                        <div className="flex gap-4">
                            {['completed', 'incomplete'].map(s => (
                                <button key={s} type="button"
                                    onClick={() => setForm(f => ({ ...f, status: s }))}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-semibold text-sm transition-all duration-200 ${form.status === s
                                        ? s === 'completed'
                                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                                            : 'border-amber-500 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                                        : 'border-slate-200 dark:border-slate-600 text-slate-400 dark:text-slate-500 hover:border-slate-300'
                                        }`}>
                                    {s === 'completed' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </form>

                {/* Modal Footer */}
                <div className="px-8 py-5 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3 bg-slate-50 dark:bg-slate-800/50">
                    <button onClick={onClose}
                        className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition">
                        Cancel
                    </button>
                    <button onClick={handleSubmit}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-500 text-white text-sm font-semibold hover:opacity-90 shadow-lg shadow-primary-500/20 transition-all duration-200 flex items-center gap-2">
                        {isEdit ? <CheckCheck size={16} /> : <Upload size={16} />}
                        {isEdit ? 'Save Changes' : 'Upload Project'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   CONFIRM DELETE DIALOG
───────────────────────────────────────────── */
function ConfirmDelete({ projectTitle, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={onCancel} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                className="relative z-10 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-8 max-w-sm w-full text-center">
                <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                    <Trash2 size={24} className="text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Delete Project?</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                    Are you sure you want to delete <span className="font-semibold text-slate-700 dark:text-slate-200">"{projectTitle}"</span>? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                    <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition">Cancel</button>
                    <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition shadow-lg shadow-red-500/20">Delete</button>
                </div>
            </motion.div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────── */
function ProjectCard({ project, onEdit, onDelete, onToggleStatus }) {
    const isComplete = project.status === 'completed';
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
                {/* Hover overlay with action buttons */}
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
                    {/* Edit */}
                    <motion.button onClick={() => onEdit(project)}
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-900 hover:text-primary-600 transition-colors shadow-lg" title="Edit">
                        <Pencil size={18} />
                    </motion.button>
                    {/* Delete */}
                    <motion.button onClick={() => onDelete(project)}
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-red-500 hover:text-red-600 transition-colors shadow-lg" title="Delete">
                        <Trash2 size={18} />
                    </motion.button>
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
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-700 mb-4">
                        {project.tags.map(tag => (
                            <div key={tag} className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 px-2.5 py-1 rounded-md border border-slate-100 dark:border-slate-700">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                                {tag}
                            </div>
                        ))}
                    </div>
                )}

                {/* Toggle status button */}
                <button
                    onClick={() => onToggleStatus(project.id)}
                    className={`mt-auto w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 border-2 ${isComplete
                        ? 'border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                        : 'border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                        }`}
                >
                    {isComplete ? (
                        <><CheckCircle2 size={15} /> Mark as Incomplete</>
                    ) : (
                        <><Clock size={15} /> Mark as Completed</>
                    )}
                </button>
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   MAIN PORTFOLIO PAGE
───────────────────────────────────────────── */
const Portfolio = () => {
    const [projects, setProjects] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : SEED_PROJECTS;
        } catch {
            return SEED_PROJECTS;
        }
    });

    const [categoryFilter, setCategoryFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editProject, setEditProject] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    // Persist to localStorage whenever projects change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }, [projects]);

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

    /* ── Handlers ── */
    const handleSave = (data) => {
        setProjects(prev => {
            const exists = prev.find(p => p.id === data.id);
            if (exists) return prev.map(p => p.id === data.id ? data : p);
            return [...prev, data];
        });
        setModalOpen(false);
        setEditProject(null);
    };

    const handleEdit = (project) => {
        setEditProject({ ...project, tags: project.tags.join(', ') });
        setModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        setProjects(prev => prev.filter(p => p.id !== deleteTarget.id));
        setDeleteTarget(null);
    };

    const handleToggleStatus = (id) => {
        setProjects(prev => prev.map(p =>
            p.id === id ? { ...p, status: p.status === 'completed' ? 'incomplete' : 'completed' } : p
        ));
    };

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

                    {/* Upload button */}
                    <motion.button
                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                        onClick={() => { setEditProject(null); setModalOpen(true); }}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-500 text-white font-semibold text-sm shadow-lg shadow-primary-500/25 hover:opacity-90 transition-all duration-200 whitespace-nowrap"
                    >
                        <Plus size={16} /> Upload Project
                    </motion.button>
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
                        <p className="text-slate-400 dark:text-slate-500 text-sm mb-6">Try adjusting your filters, or upload a new project.</p>
                        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                            onClick={() => { setEditProject(null); setModalOpen(true); }}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-500 text-white font-semibold text-sm shadow-lg shadow-primary-500/25 hover:opacity-90 transition">
                            <Plus size={16} /> Upload Project
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {filteredProjects.map(project => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onEdit={handleEdit}
                                    onDelete={setDeleteTarget}
                                    onToggleStatus={handleToggleStatus}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>

            {/* ── Modals ── */}
            <AnimatePresence>
                {modalOpen && (
                    <ProjectModal
                        project={editProject}
                        onClose={() => { setModalOpen(false); setEditProject(null); }}
                        onSave={handleSave}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {deleteTarget && (
                    <ConfirmDelete
                        projectTitle={deleteTarget.title}
                        onConfirm={handleDeleteConfirm}
                        onCancel={() => setDeleteTarget(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Portfolio;
