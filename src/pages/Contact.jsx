import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Send, MapPin } from 'lucide-react';

const Contact = () => {
    // State for form handling
    const [status, setStatus] = useState({
        submitting: false,
        submitted: false,
        error: null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(prev => ({ ...prev, submitting: true, error: null }));

        // -------------------------------------------------------------
        // INSTRUCTION: Replace 'YOUR_FORM_ID' with your Formspree ID
        // Get it from: https://formspree.io/
        // Example: "https://formspree.io/f/xyz123ab"
        // -------------------------------------------------------------
        const FORMSPREE_ENDPOINT = "https://formspree.io/f/mreebarr";

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: new FormData(e.target),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus({ submitting: false, submitted: true, error: null });
                e.target.reset(); // Clear the form
            } else {
                const data = await response.json();
                if (Object.hasOwn(data, 'errors')) {
                    setStatus({ submitting: false, submitted: false, error: data.errors.map(err => err.message).join(", ") });
                } else {
                    setStatus({ submitting: false, submitted: false, error: "Something went wrong, please try again." });
                }
            }
        } catch (error) {
            setStatus({ submitting: false, submitted: false, error: "Network error. Please check your connection." });
        }
    };

    return (
        <div className="pt-12 px-6 pb-20">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-primary-600 dark:text-primary-400 font-semibold tracking-wider text-sm uppercase">Contact</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2 mb-6">
                        <span className="dark:bg-gradient-to-r dark:from-primary-300 dark:to-secondary-300 dark:bg-clip-text dark:text-transparent">
                            Let's Work Together
                        </span>
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        Have a project in mind? I'd love to hear from you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info Side */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass-card p-6 flex items-start gap-4 dark:bg-slate-800/60 dark:border-slate-700"
                        >
                            <div className="p-3 bg-primary-50 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Email Me</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">I usually reply within 24 hours.</p>
                                <a href="mailto:abukarhussein93@gmail.com" className="text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300">abukarhussein93@gmail.com</a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="glass-card p-6 flex items-start gap-4 dark:bg-slate-800/60 dark:border-slate-700"
                        >
                            <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">WhatsApp</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">Available Mon-Fri, 9am - 5pm.</p>
                                <a href="https://wa.me/+252617939098" className="text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300">Chat on WhatsApp</a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass-card p-6 flex items-start gap-4 dark:bg-slate-800/60 dark:border-slate-700"
                        >
                            <div className="p-3 bg-secondary-50 dark:bg-secondary-900/30 rounded-lg text-secondary-600 dark:text-secondary-400">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Location</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Mogadishu / Somalia</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-8 dark:bg-slate-800/60 dark:border-slate-700"
                    >
                        {!status.submitted ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Full Name"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email Address"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        placeholder="Tell me about your project..."
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                    ></textarea>
                                </div>

                                {status.error && (
                                    <div className="text-red-500 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-900/50">
                                        {status.error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status.submitting}
                                    className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold shadow-lg shadow-primary-500/30 flex items-center justify-center gap-2 hover:gap-3 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status.submitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
                                    <Send size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
                                    Thanks for reaching out! I'll get back to you within 24 hours.
                                </p>
                                <button
                                    onClick={() => setStatus({ submitting: false, submitted: false, error: null })}
                                    className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors text-sm"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
