import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { USE_CASES, PACKAGE_IDS } from '../constants';
import { SpotlightCard, TiltedCard, BorderBeam, AnimatedList, SplitText } from '../components/AnimatedUI';
import { ThemeContext } from '../index';
import { Theme } from '../types';
import { UseCase } from '../types';
import { useTranslation } from 'react-i18next';

export default function Solutions() {
    const [filter, setFilter] = useState<string | null>(null);
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation();
    const categories = [t('solutions.filter_all'), ...Array.from(new Set(USE_CASES.map(u => u.category)))];

    const filteredCases = filter === t('solutions.filter_all') ? USE_CASES : (filter ? USE_CASES.filter(u => u.category === filter) : []);

    const packages = t('packages', { returnObjects: true }) as Record<string, { title: string, price: string, duration: string, outcome: string, features: string[] }>;

    return (
        <div className="pt-32 pb-20 min-h-screen relative">
            {/* Hero Background */}
            <div className="absolute top-0 left-0 right-0 h-[600px] overflow-hidden -z-10 pointer-events-none md:pointer-events-auto">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90 dark:to-black z-10" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-20 text-center max-w-3xl mx-auto">
                    <SplitText text={t('solutions.pre_title')} className="text-sm font-mono text-blue-500 mb-4 tracking-widest uppercase" />
                    <h1 className="text-5xl font-display font-bold mb-6">{t('solutions.title')}</h1>
                    <p className="text-xl text-gray-500">
                        {t('solutions.subtitle')}
                    </p>
                </div>

                {/* Categories Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((cat, i) => (
                        <motion.button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: filter === null ? [1, 1.05, 1] : 1,
                                borderColor: filter === null ? ['rgba(59,130,246,0)', 'rgba(59,130,246,0.5)', 'rgba(59,130,246,0)'] : 'transparent'
                            }}
                            transition={{
                                delay: i * 0.1,
                                scale: filter === null ? { duration: 2, repeat: Infinity, delay: i * 0.2 } : {},
                                borderColor: filter === null ? { duration: 2, repeat: Infinity, delay: i * 0.2 } : {}
                            }}
                            className={`px-6 py-3 rounded-full text-sm font-medium transition-all border-2 ${filter === cat ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-gray-100 dark:bg-gray-800 border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>

                {/* Use Cases Grid OR Empty State Hint */}
                <div className="min-h-[400px]">
                    {!filter ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-20 opacity-50"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="text-4xl mb-4 text-blue-500"
                            >
                                ↑
                            </motion.div>
                            <p className="text-xl text-gray-500 font-light">{t('solutions.select_category_hint')}</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32"
                        >
                            {filteredCases.map((useCase) => (
                                <SpotlightCard key={useCase.id} className="h-full">
                                    <div className="p-8 h-full flex flex-col">
                                        <span className="text-xs font-mono text-blue-500 mb-2 block">{useCase.category}</span>
                                        <h3 className="text-xl font-bold mb-3">{t(`use_cases.${useCase.id}.title`)}</h3>
                                        <p className="text-gray-500 text-sm mb-6 flex-grow">{t(`use_cases.${useCase.id}.description`)}</p>
                                        {t(`use_cases.${useCase.id}.roi`) && t(`use_cases.${useCase.id}.roi`) !== `use_cases.${useCase.id}.roi` && (
                                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                                <span className="text-green-500 text-xs font-bold uppercase tracking-wide">{t('solutions.roi_label')}</span>
                                                <p className="font-medium text-sm">{t(`use_cases.${useCase.id}.roi`)}</p>
                                            </div>
                                        )}
                                    </div>
                                </SpotlightCard>
                            ))}
                        </motion.div>
                    )}
                </div>

                {/* Packages Section */}
                <div className="mb-20">
                    <h2 className="text-4xl font-display font-bold mb-12 text-center">{t('solutions.models_title')}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {PACKAGE_IDS.map((id) => {
                            const pkg = packages[id.toString()];
                            return (
                                <TiltedCard key={id}>
                                    <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl h-full flex flex-col">
                                        {id === 1 && <BorderBeam />}
                                        <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                                        <div className="text-3xl font-light mb-6 text-gray-400">{pkg.price || 'Custom'}</div>
                                        <div className="space-y-4 mb-8 flex-grow">
                                            <p className="text-sm font-medium">{t('solutions.duration')}: {pkg.duration}</p>
                                            <p className="text-sm font-medium text-gray-500">{t('solutions.outcome')}: {pkg.outcome}</p>
                                            <hr className="border-gray-100 dark:border-gray-800" />
                                            <AnimatedList items={pkg.features} />
                                        </div>
                                        <button className={`w-full py-3 rounded-lg font-bold transition-colors ${id === 1 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                                            {t('solutions.select_btn')}
                                        </button>
                                    </div>
                                </TiltedCard>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}