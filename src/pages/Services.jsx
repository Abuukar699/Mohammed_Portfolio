import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Layout, ShoppingBag, RefreshCw, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
    const services = [
        {
            id: 1,
            title: 'Business Website',
            description: 'Professional websites that build credibility and convert visitors into customers. Perfect for small to medium businesses.',
            icon: <Briefcase className="w-10 h-10 text-primary-500" />,
            priceStart: '$200'
        },
        {
            id: 2,
            title: 'Portfolio Website',
            description: 'Showcase your work and skills with a stunning personal portfolio. Ideal for creatives, freelancers, and students.',
            icon: <Layout className="w-10 h-10 text-secondary-500" />,
            priceStart: '$100'
        },
        {
            id: 3,
            title: 'E-commerce Store',
            description: 'Sell your products online with a secure, user-friendly online store. Includes payment gateway integration.',
            icon: <ShoppingBag className="w-10 h-10 text-accent-500" />,
            priceStart: '$300+'
        },
        {
            id: 4,
            title: 'Website Redesign',
            description: 'Transform your outdated website into a modern, responsive, and high-performing digital asset.',
            icon: <RefreshCw className="w-10 h-10 text-primary-400" />,
            priceStart: 'Custom'
        }
    ];

    return (
        <div className="pt-12 px-6 pb-20">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-primary-600 dark:text-primary-400 font-semibold tracking-wider text-sm uppercase">Services</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2 mb-6">
                        <span className="dark:bg-gradient-to-r dark:from-primary-300 dark:to-secondary-300 dark:bg-clip-text dark:text-transparent">
                            What I Can Do For You
                        </span>
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        High-quality services tailored to your specific needs.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-8 group hover:border-primary-200 dark:hover:border-primary-500/30 dark:bg-slate-800/40 dark:border-slate-700 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-slate-700">
                                    {service.icon}
                                </div>
                                <div className="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-semibold border border-primary-100 dark:border-primary-800">
                                    Starts from {service.priceStart}
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{service.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                                {service.description}
                            </p>

                            <Link to="/contact" className="inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                                Book this service <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
