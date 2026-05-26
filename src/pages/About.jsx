import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import profileImg from '../assets/profile.jpg';

const About = () => {
    const skills = [
        { name: 'HTML5 & CSS3', level: 'Expert' },
        { name: 'JavaScript (ES6+)', level: 'Advanced' },
        { name: 'React.js', level: 'Advanced' },
        { name: 'Tailwind CSS', level: 'Expert' },
        { name: 'Node.js', level: 'Intermediate' },
        { name: 'UI/UX Design', level: 'Advanced' },
        { name: 'Flutter Developer', level: 'Advanced' },
    ];

    return (
        <div className="pt-12 px-6 pb-20">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary-600 dark:text-primary-400 font-semibold tracking-wider text-sm uppercase">About Me</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2 mb-6">
                        <span className="dark:bg-gradient-to-r dark:from-primary-300 dark:to-secondary-300 dark:bg-clip-text dark:text-transparent">
                            Passionate Web Developer
                        </span>
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        I turn complex problems into simple, beautiful, and intuitive designs.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-200 to-accent-200 dark:from-primary-800 dark:to-accent-800 rounded-3xl blur-2xl opacity-60 -rotate-6" />
                        <img
                            src={profileImg}
                            alt="Profile"
                            className="relative rounded-3xl shadow-xl w-full object-cover aspect-[3/4]"
                        />
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Who I Am</h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            Hello! I'm a dedicated web developer with over 2 years of experience in building digital products. My journey began with a curiosity for how things work on the internet, and has evolved into a passion for creating seamless user experiences.
                        </p>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            I specialize in frontend development using modern tools like React and Tailwind CSS. I believe that good design is not just about how things look, but how they work.
                        </p>

                        <div className="bg-primary-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-primary-100 dark:border-primary-900/50">
                            <h4 className="font-semibold text-primary-800 dark:text-primary-300 mb-2">My Mission</h4>
                            <p className="text-primary-600 dark:text-primary-400 text-sm">
                                To help businesses and individuals establish a strong digital presence through custom, high-quality bespoke websites.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-20">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 text-center">My Tech Stack</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {skills.map((skill) => (
                            <motion.div
                                key={skill.name}
                                whileHover={{ scale: 1.02 }}
                                className="glass-card p-4 flex items-center justify-between group dark:bg-slate-800/60 dark:border-slate-700"
                            >
                                <span className="font-medium text-slate-700 dark:text-slate-200">{skill.name}</span>
                                <Check className="w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
