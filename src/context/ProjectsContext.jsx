import React, { createContext, useContext, useState, useEffect } from 'react';
import xirfadleImage from '../assets/xirfadle-center.png';
import { verifyAdminToken } from './AuthContext';

/* ─────────────────────────────────────────────
   SEED DATA
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

const ProjectsContext = createContext(null);

export function ProjectsProvider({ children }) {
    const [projects, setProjects] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : SEED_PROJECTS;
        } catch {
            return SEED_PROJECTS;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
        } catch {
            console.warn('Could not persist projects to localStorage (storage may be full).');
        }
    }, [projects]);

    /* ── Admin-only mutations (token required) ── */
    const addProject = (data, token) => {
        verifyAdminToken(token);
        const newProject = { ...data, id: Date.now() };
        setProjects(prev => [...prev, newProject]);
        return newProject;
    };

    const updateProject = (data, token) => {
        verifyAdminToken(token);
        setProjects(prev => prev.map(p => p.id === data.id ? data : p));
        return data;
    };

    const deleteProject = (id, token) => {
        verifyAdminToken(token);
        setProjects(prev => prev.filter(p => p.id !== id));
    };

    const toggleStatus = (id, token) => {
        verifyAdminToken(token);
        setProjects(prev => prev.map(p =>
            p.id === id ? { ...p, status: p.status === 'completed' ? 'incomplete' : 'completed' } : p
        ));
    };

    return (
        <ProjectsContext.Provider value={{ projects, addProject, updateProject, deleteProject, toggleStatus }}>
            {children}
        </ProjectsContext.Provider>
    );
}

export function useProjects() {
    const ctx = useContext(ProjectsContext);
    if (!ctx) {
        throw new Error('useProjects must be used within a ProjectsProvider');
    }
    return ctx;
}
