import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
    LayoutDashboard, Plus, Pencil, Trash2, Upload, Tag, Image as ImageIcon,
    Link as LinkIcon, Github, X, CheckCircle2, Clock, Search,
    SlidersHorizontal, LogOut, CheckCheck, ExternalLink, ShieldCheck,
    Layers, BarChart3, Activity, Eye
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProjects } from '../../context/ProjectsContext';

/* ─────────────────────────────────────────────
   EMPTY FORM
───────────────────────────────────────────── */
const emptyForm = {
    title: '', category: '', image: '', description: '',
    tags: '', demoUrl: '', githubUrl: '', status: 'incomplete',
};

/** Resize/compress uploads so projects fit in localStorage. */
function compressImageFile(file, maxWidth = 1200, quality = 0.82) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new Image();
            img.onload = () => {
                const scale = img.width > maxWidth ? maxWidth / img.width : 1;
                const w = Math.round(img.width * scale);
                const h = Math.round(img.height * scale);
                const canvas = document.createElement('canvas');
                canvas.width = w;
                canvas.height = h;
                canvas.getContext('2d').drawImage(img, 0, 0, w, h);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            img.onerror = () => reject(new Error('Could not read image.'));
            img.src = ev.target.result;
        };
        reader.onerror = () => reject(new Error('Could not read file.'));
        reader.readAsDataURL(file);
    });
}

/* ─────────────────────────────────────────────
   STATUS BADGE
───────────────────────────────────────────── */
function StatusBadge({ status }) {
    const ok = status === 'completed';
    return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full
            ${ok ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
            {ok ? <CheckCircle2 size={11} /> : <Clock size={11} />}
            {ok ? 'Completed' : 'In Progress'}
        </span>
    );
}

/* ─────────────────────────────────────────────
   PROJECT FORM MODAL
───────────────────────────────────────────── */
function ProjectModal({ project, onClose, onSave }) {
    const [form, setForm] = useState(
        project ? { ...project, tags: Array.isArray(project.tags) ? project.tags.join(', ') : project.tags } : emptyForm
    );
    const [errors, setErrors] = useState({});
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef();
    const isEdit = !!project;

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = 'Title is required.';
        if (!form.category.trim()) e.category = 'Category is required.';
        if (!form.description.trim()) e.description = 'Description is required.';
        return e;
    };

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            setErrors(er => ({ ...er, image: 'Please choose an image file.' }));
            return;
        }
        setUploading(true);
        try {
            const dataUrl = await compressImageFile(file);
            setForm(f => ({ ...f, image: dataUrl }));
            setErrors(er => ({ ...er, image: undefined }));
        } catch {
            setErrors(er => ({ ...er, image: 'Upload failed. Try another image or paste a URL.' }));
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    };

    const handleSubmit = (e) => {
        e?.preventDefault();
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

    const field = (label, key, type = 'text', placeholder = '') => (
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
            <input
                type={type} value={form[key]}
                onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(er => ({ ...er, [key]: undefined })); }}
                placeholder={placeholder}
                className={`w-full px-4 py-2.5 rounded-xl border ${errors[key] ? 'border-red-500' : 'border-slate-600'} bg-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition`}
            />
            {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
        </div>
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative z-10 w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
                    <div className="flex items-center gap-3">
                        {isEdit ? <Pencil size={18} className="text-white/80" /> : <Upload size={18} className="text-white/80" />}
                        <h2 className="text-lg font-bold text-white">{isEdit ? 'Edit Project' : 'Upload New Project'}</h2>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition">
                        <X size={16} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-8 space-y-5 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {field('Project Title *', 'title', 'text', 'e.g. My Awesome App')}
                        {field('Category *', 'category', 'text', 'e.g. SaaS, Fintech, E-Learning')}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Description *</label>
                        <textarea
                            value={form.description}
                            onChange={e => {
                                setForm(f => ({ ...f, description: e.target.value }));
                                setErrors(er => ({ ...er, description: undefined }));
                            }}
                            rows={3}
                            placeholder="Brief description of the project"
                            className={`w-full px-4 py-2.5 rounded-xl border ${errors.description ? 'border-red-500' : 'border-slate-600'} bg-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-y min-h-[80px]`}
                        />
                        {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            <span className="flex items-center gap-1"><Tag size={13} /> Tech Stack / Tags</span>
                        </label>
                        <input type="text"
                            value={typeof form.tags === 'string' ? form.tags : form.tags.join(', ')}
                            onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                            placeholder="React, Node.js, MongoDB (comma-separated)"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            <span className="flex items-center gap-1"><ImageIcon size={13} /> Project Image</span>
                        </label>
                        <div className="flex gap-3">
                            <input type="text"
                                value={typeof form.image === 'string' && !form.image.startsWith('data:') ? form.image : ''}
                                onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                                placeholder="Paste image URL…"
                                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            />
                            <button type="button" disabled={uploading} onClick={() => fileRef.current?.click()}
                                className="px-4 py-2.5 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 text-sm font-medium hover:bg-purple-600/30 transition flex items-center gap-2 disabled:opacity-50">
                                <Upload size={14} /> {uploading ? '…' : 'Upload'}
                            </button>
                            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                        </div>
                        {errors.image && <p className="text-red-400 text-xs mt-1">{errors.image}</p>}
                        {form.image && (
                            <div className="mt-3 rounded-xl overflow-hidden h-32 bg-slate-800">
                                <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} />
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                <span className="flex items-center gap-1"><LinkIcon size={13} /> Live Demo URL</span>
                            </label>
                            <input type="url" value={form.demoUrl}
                                onChange={e => setForm(f => ({ ...f, demoUrl: e.target.value }))}
                                placeholder="https://your-demo.com"
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                <span className="flex items-center gap-1"><Github size={13} /> GitHub URL</span>
                            </label>
                            <input type="url" value={form.githubUrl}
                                onChange={e => setForm(f => ({ ...f, githubUrl: e.target.value }))}
                                placeholder="https://github.com/..."
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Project Status</label>
                        <div className="flex gap-4">
                            {['completed', 'incomplete'].map(s => (
                                <button key={s} type="button"
                                    onClick={() => setForm(f => ({ ...f, status: s }))}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-semibold text-sm transition-all duration-200 ${form.status === s
                                        ? s === 'completed'
                                            ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                                            : 'border-amber-500 bg-amber-500/20 text-amber-400'
                                        : 'border-slate-600 text-slate-500 hover:border-slate-500'}`}>
                                    {s === 'completed' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="px-8 py-5 border-t border-slate-700 flex justify-end gap-3 bg-slate-800/50">
                    <button onClick={onClose}
                        className="px-5 py-2.5 rounded-xl border border-slate-600 text-slate-300 text-sm font-medium hover:bg-slate-700 transition">
                        Cancel
                    </button>
                    <button onClick={handleSubmit}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold hover:opacity-90 shadow-lg shadow-purple-500/25 transition-all duration-200 flex items-center gap-2">
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                className="relative z-10 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
                <div className="w-14 h-14 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
                    <Trash2 size={24} className="text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Delete Project?</h3>
                <p className="text-slate-400 text-sm mb-6">
                    Are you sure you want to delete <span className="font-semibold text-slate-200">"{projectTitle}"</span>? This cannot be undone.
                </p>
                <div className="flex gap-3">
                    <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-slate-600 text-slate-300 font-medium text-sm hover:bg-slate-800 transition">Cancel</button>
                    <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition shadow-lg shadow-red-500/20">Delete</button>
                </div>
            </motion.div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   ADMIN PROJECT ROW (table row)
───────────────────────────────────────────── */
function ProjectRow({ project, onEdit, onDelete, onToggle }) {
    const fallback = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=400';
    return (
        <motion.tr layout className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors group">
            <td className="py-4 px-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-700 shrink-0">
                        <img src={project.image || fallback} alt={project.title}
                            className="w-full h-full object-cover" onError={e => { e.target.src = fallback; }} />
                    </div>
                    <div>
                        <p className="font-semibold text-white text-sm">{project.title}</p>
                        <p className="text-slate-500 text-xs mt-0.5 line-clamp-1">{project.description}</p>
                    </div>
                </div>
            </td>
            <td className="py-4 px-4">
                <span className="text-xs font-medium text-slate-300 bg-slate-700 px-2.5 py-1 rounded-full">{project.category}</span>
            </td>
            <td className="py-4 px-4"><StatusBadge status={project.status} /></td>
            <td className="py-4 px-4">
                <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {(project.tags || []).slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded">{tag}</span>
                    ))}
                    {project.tags?.length > 3 && <span className="text-xs text-slate-500">+{project.tags.length - 3}</span>}
                </div>
            </td>
            <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                    {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noreferrer"
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-blue-600/30 text-slate-400 hover:text-blue-400 transition" title="Live Demo">
                            <ExternalLink size={14} />
                        </a>
                    )}
                    {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer"
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-400 transition" title="GitHub">
                            <Github size={14} />
                        </a>
                    )}
                    <button onClick={() => onToggle(project.id)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg transition ${project.status === 'completed'
                            ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400'}`}
                        title="Toggle Status">
                        {project.status === 'completed' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                    </button>
                    <button onClick={() => onEdit(project)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 transition" title="Edit">
                        <Pencil size={14} />
                    </button>
                    <button onClick={() => onDelete(project)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition" title="Delete">
                        <Trash2 size={14} />
                    </button>
                </div>
            </td>
        </motion.tr>
    );
}

/* ─────────────────────────────────────────────
   ADMIN DASHBOARD PAGE
───────────────────────────────────────────── */
const AdminDashboard = () => {
    const { logout, token } = useAuth();
    const { projects, addProject, updateProject, deleteProject, toggleStatus } = useProjects();
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [modalOpen, setModalOpen] = useState(false);
    const [editProject, setEditProject] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const completedCount = projects.filter(p => p.status === 'completed').length;
    const incompleteCount = projects.filter(p => p.status === 'incomplete').length;
    const categories = ['All', ...new Set(projects.map(p => p.category))];

    const filtered = projects.filter(p => {
        const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
        const matchStatus = statusFilter === 'All' || p.status === statusFilter;
        const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchStatus && matchSearch;
    });

    const handleSave = (data) => {
        try {
            if (editProject) {
                updateProject(data, token);
            } else {
                addProject(data, token);
            }
            setModalOpen(false);
            setEditProject(null);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleEdit = (project) => {
        setEditProject(project);
        setModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        try {
            deleteProject(deleteTarget.id, token);
            setDeleteTarget(null);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleToggle = (id) => {
        try {
            toggleStatus(id, token);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/admin/login', { replace: true });
    };

    const stats = [
        { label: 'Total Projects', value: projects.length, icon: Layers, color: 'from-purple-500 to-indigo-600', bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400' },
        { label: 'Completed', value: completedCount, icon: CheckCircle2, color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
        { label: 'In Progress', value: incompleteCount, icon: Activity, color: 'from-amber-500 to-orange-600', bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400' },
        { label: 'Completion Rate', value: projects.length ? `${Math.round((completedCount / projects.length) * 100)}%` : '0%', icon: BarChart3, color: 'from-blue-500 to-cyan-600', bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* ── TOP NAVBAR ── */}
            <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                            <ShieldCheck size={16} className="text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-white text-base leading-none">Admin Dashboard</h1>
                            <p className="text-slate-500 text-xs mt-0.5">Portfolio Management</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/portfolio" target="_blank" rel="noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-sm hover:bg-slate-800 transition">
                            <Eye size={14} /> View Portfolio
                        </Link>
                        <button onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20 transition">
                            <LogOut size={14} /> Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                {/* ── STATS GRID ── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <motion.div key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className={`${stat.bg} border ${stat.border} rounded-2xl p-5`}>
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg`}>
                                <stat.icon size={18} className="text-white" />
                            </div>
                            <p className={`text-2xl font-bold ${stat.text}`}>{stat.value}</p>
                            <p className="text-slate-500 text-xs mt-1">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* ── CONTROLS BAR ── */}
                <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full lg:w-72">
                            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text" value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search projects…"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            />
                        </div>

                        <div className="flex flex-wrap gap-3 items-center">
                            {/* Status filter */}
                            <div className="flex items-center gap-2">
                                <SlidersHorizontal size={14} className="text-slate-500" />
                                {['All', 'completed', 'incomplete'].map(s => (
                                    <button key={s} onClick={() => setStatusFilter(s)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${statusFilter === s
                                            ? s === 'completed' ? 'bg-emerald-500 text-white'
                                                : s === 'incomplete' ? 'bg-amber-500 text-white'
                                                    : 'bg-purple-600 text-white'
                                            : 'bg-slate-800 text-slate-400 border border-slate-600 hover:border-slate-500'}`}>
                                        {s === 'All' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}
                                    </button>
                                ))}
                            </div>

                            {/* Category filter */}
                            <select
                                value={categoryFilter}
                                onChange={e => setCategoryFilter(e.target.value)}
                                className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>

                            {/* Upload button */}
                            <motion.button
                                id="admin-upload-project-btn"
                                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                onClick={() => { setEditProject(null); setModalOpen(true); }}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 hover:opacity-90 transition-all whitespace-nowrap"
                            >
                                <Plus size={16} /> Upload Project
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* ── PROJECTS TABLE ── */}
                <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
                        <h2 className="font-semibold text-white flex items-center gap-2">
                            <LayoutDashboard size={16} className="text-purple-400" />
                            Projects ({filtered.length})
                        </h2>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                                <Layers size={28} className="text-slate-600" />
                            </div>
                            <p className="text-slate-400 font-medium mb-1">No projects found</p>
                            <p className="text-slate-600 text-sm">Try adjusting filters or upload a new project.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-700/50">
                                        <th className="py-3 px-6 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Project</th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tech Stack</th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence>
                                        {filtered.map(project => (
                                            <ProjectRow
                                                key={project.id}
                                                project={project}
                                                onEdit={handleEdit}
                                                onDelete={setDeleteTarget}
                                                onToggle={handleToggle}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            {/* ── MODALS ── */}
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

export default AdminDashboard;
