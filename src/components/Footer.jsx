import React from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100 py-12 px-6 mt-20">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-1">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent mb-4">
                        Mohamett
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Building premium digital experiences for forward-thinking businesses.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold text-slate-800 mb-4">Services</h4>
                    <ul className="space-y-2 text-sm text-slate-500">
                        <li><a href="/services" className="hover:text-primary-500 transition-colors">Web Development</a></li>
                        <li><a href="/services" className="hover:text-primary-500 transition-colors">UI/UX Design</a></li>
                        <li><a href="/services" className="hover:text-primary-500 transition-colors">E-commerce</a></li>
                        <li><a href="/services" className="hover:text-primary-500 transition-colors">SEO Optimization</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-slate-800 mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-slate-500">
                        <li><a href="/about" className="hover:text-primary-500 transition-colors">About</a></li>
                        <li><a href="/portfolio" className="hover:text-primary-500 transition-colors">Portfolio</a></li>
                        <li><a href="/pricing" className="hover:text-primary-500 transition-colors">Pricing</a></li>
                        <li><a href="/contact" className="hover:text-primary-500 transition-colors">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-slate-800 mb-4">Connect</h4>
                    <div className="flex gap-4">
                        <a href="https://github.com/Abuukar699" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-primary-500 hover:text-white transition-all">
                            <Github size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/mohammed-hussein-17b39a370/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-primary-500 hover:text-white transition-all">
                            <Linkedin size={20} />
                        </a>
                        <a href="mailto:abukarhussein93@gmail.com" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-primary-500 hover:text-white transition-all">
                            <Mail size={20} />
                        </a>
                        <a href="+252617909098" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-primary-500 hover:text-white transition-all">
                            <Phone size={20}/>
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
                <p>&copy; 2024 Designed and Built By Mohamed Abuukar Hussein.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-slate-600">Privacy Policy</a>
                    <a href="#" className="hover:text-slate-600">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
