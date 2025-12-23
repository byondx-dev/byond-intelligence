import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { USE_CASES, PACKAGES } from '../constants';
import { SpotlightCard, TiltedCard, BorderBeam, AnimatedList, SplitText } from '../components/AnimatedUI';
import { ThemeContext } from '../index';
import { Theme } from '../types';
import { UseCase } from '../types';

export default function Solutions() {
    const [filter, setFilter] = useState('All');
    const { theme } = useContext(ThemeContext);
    const categories = ['All', ...Array.from(new Set(USE_CASES.map(u => u.category)))];

    const filteredCases = filter === 'All' ? USE_CASES : USE_CASES.filter(u => u.category === filter);

    return (
        <div className="pt-32 pb-20 min-h-screen relative">
            {/* Hero Background - RippleGrid (Removed) */}
            <div className="absolute top-0 left-0 right-0 h-[600px] overflow-hidden -z-10 pointer-events-none md:pointer-events-auto">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90 dark:to-black z-10" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-20 text-center max-w-3xl mx-auto">
                    <SplitText text="Solutions & Use Cases" className="text-sm font-mono text-blue-500 mb-4 tracking-widest uppercase" />
                    <h1 className="text-5xl font-display font-bold mb-6">Real World Impact.</h1>
                    <p className="text-xl text-gray-500">
                        Wir bauen keine Demos, sondern produktive Systeme.
                        Hier sind 24+ konkrete Ansätze, wie wir Ihr Geschäft beschleunigen.
                    </p>
                </div>

                {/* Categories Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Use Cases Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
                    {filteredCases.map((useCase) => (
                        <SpotlightCard key={useCase.id} className="h-full">
                            <div className="p-8 h-full flex flex-col">
                                <span className="text-xs font-mono text-blue-500 mb-2 block">{useCase.category}</span>
                                <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                                <p className="text-gray-500 text-sm mb-6 flex-grow">{useCase.description}</p>
                                {useCase.roi && (
                                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                        <span className="text-green-500 text-xs font-bold uppercase tracking-wide">ROI Impact</span>
                                        <p className="font-medium text-sm">{useCase.roi}</p>
                                    </div>
                                )}
                            </div>
                        </SpotlightCard>
                    ))}
                </motion.div>

                {/* Packages Section */}
                <div className="mb-20">
                    <h2 className="text-4xl font-display font-bold mb-12 text-center">Engagement Models</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {PACKAGES.map((pkg, i) => (
                            <TiltedCard key={i}>
                                <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl h-full flex flex-col">
                                    {i === 1 && <BorderBeam />}
                                    <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                                    <div className="text-3xl font-light mb-6 text-gray-400">{pkg.price || 'Custom'}</div>
                                    <div className="space-y-4 mb-8 flex-grow">
                                        <p className="text-sm font-medium">Dauer: {pkg.duration}</p>
                                        <p className="text-sm font-medium text-gray-500">Outcome: {pkg.outcome}</p>
                                        <hr className="border-gray-100 dark:border-gray-800" />
                                        <AnimatedList items={pkg.features} />
                                    </div>
                                    <button className={`w-full py-3 rounded-lg font-bold transition-colors ${i === 1 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                                        Select
                                    </button>
                                </div>
                            </TiltedCard>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}