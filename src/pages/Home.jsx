import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Code, Monitor, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import profileImg from '../assets/profile.jpg';

const Home = () => {
    return (
        <div className="space-y-24 pb-20">
            {/* Hero Section */}
            <section className="relative px-6 py-12 md:py-24 lg:py-32 overflow-hidden">
                <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/4" />
                <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-secondary-200/30 dark:bg-secondary-900/20 rounded-full blur-3xl opacity-50 -translate-x-1/3 translate-y-1/4" />

                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-primary-600 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/30 rounded-full border border-primary-100 dark:border-primary-800">
                            Hi I am
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
                            Mohamed Abuukar Hussein <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-500 hover:to-secondary-400 transition-all">Software</span>, Engineer
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-lg">
                            I build professional, high-converting websites that help businesses grow. minimal design, maximum impact.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/contact">
                                <button className="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-semibold shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 transition-all transform hover:-translate-y-1">
                                    Order Your Website
                                </button>
                            </Link>
                            <Link to="/portfolio">
                                <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-full font-semibold transition-all flex items-center justify-center gap-2 group">
                                    View Portfolio
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center gap-8 text-slate-500 dark:text-slate-400 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-accent-400" />
                                <span>Modern Tech Stack</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-accent-400" />
                                <span>Fast Delivery</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative z-10 glass-card p-4 rotate-1 md:rotate-2">
                            {/* Illustration/Image Placeholder */}
                            <div className="rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 dark:bg-slate-800 relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/40 dark:to-secondary-900/40 opacity-50" />
                                <img
                                    src={profileImg}
                                    alt="Profile"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />

                                {/* Floating Elements */}
                                <div className="absolute -bottom-6 -left-6 glass p-4 rounded-xl flex items-center gap-3 animate-bounce-slow shadow-lg">
                                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                        <Code size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">Lines of Code</div>
                                        <div className="font-bold text-slate-800 dark:text-white">10k+</div>
                                    </div>
                                </div>

                                <div className="absolute -top-6 -right-6 glass p-4 rounded-xl flex items-center gap-3 animate-pulse-slow shadow-lg delay-700">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <Monitor size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">Projects Done</div>
                                        <div className="font-bold text-slate-800 dark:text-white">50+</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Teaser */}
            <section className="px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Why Choose Me?</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Because I don't just build websites; I build digital solutions that work for your business.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <Monitor className="w-8 h-8 text-primary-500" />, title: 'Responsive Design', desc: 'Websites that look amazing on every device, from mobile phones to large desktop screens.' },
                            { icon: <Code className="w-8 h-8 text-secondary-500" />, title: 'Clean Code', desc: 'Built with modern technologies like React and Tailwind CSS for speed and scalability.' },
                            { icon: <Smartphone className="w-8 h-8 text-accent-400" />, title: 'SEO Optimized', desc: 'Rank higher on Google with built-in SEO best practices and fast loading speeds.' }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="glass-card p-8 text-center hover:bg-white dark:hover:bg-slate-800 transition-colors"
                            >
                                <div className="w-16 h-16 mx-auto bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 dark:border-slate-800">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{item.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
