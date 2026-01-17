import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Layers, Code2 } from 'lucide-react';

const Portfolio = () => {
    const [filter, setFilter] = useState('All');

    const projects = [
        {
            id: 1,
            title: 'EduLearn Platform',
            category: 'E-Learning',
            image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1000',
            description: 'A comprehensive learning management system for schools with student dashboards, quizzes, and grade tracking.',
            tags: ['React', 'Node.js', 'MongoDB', 'Socket.io']
        },
        {
            id: 2,
            title: 'Luxe Interiors',
            category: 'Business',
            image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000',
            description: 'A minimal, high-performance portfolio website for an award-winning interior design firm.',
            tags: ['Next.js', 'Tailwind', 'Framer Motion']
        },
        {
            id: 3,
            title: 'CryptoTracker',
            category: 'Fintech',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
            description: 'Real-time cryptocurrency dashboard with live price charts, news aggregation, and portfolio tracking.',
            tags: ['React', 'Chart.js', 'CoinGecko API']
        },
        {
            id: 4,
            title: 'GreenEat Delivery',
            category: 'E-commerce',
            image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1000',
            description: 'A food delivery app interface featuring real-time order tracking, cart management, and payment integration.',
            tags: ['React Native', 'Firebase', 'Redux']
        },
        {
            id: 5,
            title: 'TaskMaster Pro',
            category: 'SaaS',
            image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1000',
            description: 'Productivity tool for teams with Kanban boards, drag-and-drop tasks, and time tracking features.',
            tags: ['Vue.js', 'Tailwind', 'Supabase']
        },
        {
            id: 6,
            title: 'TravelWise',
            category: 'Business',
            image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1000',
            description: 'AI-powered travel itinerary planner that suggests destinations based on user preferences and budget.',
            tags: ['React', 'OpenAI API', 'Mapbox']
        }
    ];

    const categories = ['All', ...new Set(projects.map(p => p.category))];
    const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

    return (
        <div className="pt-12 px-6 pb-20 overflow-hidden relative min-h-screen">
            {/* Background Decorations */}
            <div className="absolute top-20 left-0 w-96 h-96 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl -z-10 animate-pulse-slow" />
            <div className="absolute bottom-20 right-0 w-96 h-96 bg-secondary-200/20 dark:bg-secondary-900/10 rounded-full blur-3xl -z-10 animate-pulse-slow delay-1000" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-primary-600 dark:text-primary-400 font-semibold tracking-wider text-sm uppercase">Portfolio</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2 mb-6">Selected Works</h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        A curated collection of projects that demonstrate my passion for building high-quality digital experiences.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 border border-slate-100 dark:border-slate-700'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={project.id}
                                className="group relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 dark:border-slate-700 flex flex-col h-full"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center gap-4 backdrop-blur-sm">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 hover:text-primary-600 transition-colors"
                                            title="View Demo"
                                        >
                                            <ExternalLink size={20} />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 hover:text-primary-600 transition-colors"
                                            title="View Code"
                                        >
                                            <Github size={20} />
                                        </motion.button>
                                    </div>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-slate-800 dark:text-white shadow-md">
                                        {project.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3 flex-grow">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-50 dark:border-slate-700">
                                        {project.tags.map(tag => (
                                            <div key={tag} className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 px-2.5 py-1 rounded-md border border-slate-100 dark:border-slate-700">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Portfolio;
