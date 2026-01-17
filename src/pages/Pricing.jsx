import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
    const plans = [
        {
            name: 'Basic',
            price: '$100',
            description: 'Perfect for landing pages and personal portfolios.',
            features: [
                'Single Page Website',
                'Mobile Responsive',
                'Basic SEO Setup',
                'Contact Form',
                '1 Week Support'
            ]
        },
        {
            name: 'Business',
            price: '$200',
            description: 'Ideal for small businesses needing more presence.',
            popular: true,
            features: [
                'Up to 5 Pages',
                'Mobile Responsive',
                'Advanced SEO',
                'Content Management',
                'Social Media Integration',
                '1 Month Support'
            ]
        },
        {
            name: 'E-commerce',
            price: '$300+',
            description: 'Full-featured online store to sell your products.',
            features: [
                'Online Store Setup',
                'Payment Integration',
                'Product Management',
                'User Accounts',
                'Analytics Dashboard',
                '3 Months Support'
            ]
        }
    ];

    return (
        <div className="pt-12 px-6 pb-20">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-primary-600 dark:text-primary-400 font-semibold tracking-wider text-sm uppercase">Pricing</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2 mb-6">
                        <span className="dark:bg-gradient-to-r dark:from-primary-300 dark:to-secondary-300 dark:bg-clip-text dark:text-transparent">
                            Simple, Transparent Pricing
                        </span>
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        No hidden fees. Choose the plan that fits your needs.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative p-8 rounded-2xl border transition-all duration-300 ${plan.popular
                                ? 'bg-white dark:bg-slate-800 border-primary-500 shadow-2xl scale-105 z-10'
                                : 'bg-white/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm h-10">{plan.description}</p>
                            </div>

                            <div className="mb-8">
                                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
                                <span className="text-slate-400">/project</span>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                        <div className={`p-0.5 rounded-full ${plan.popular ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link to="/contact">
                                <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular
                                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-primary-500/30'
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
                                    }`}>
                                    Choose {plan.name}
                                </button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pricing;
