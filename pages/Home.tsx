import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroOrb from '../components/HeroOrb';
import { BlurText, Stepper, ScrollStack, ShinyText, Magnet, SplitText, CountUp, AuroraText } from '../components/AnimatedUI';
import { QUIZ_IDS } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { generateAnalysis } from '../utils/quizGenerators';

const Hero = () => {
    const { t } = useTranslation();
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
                <HeroOrb />
            </motion.div>

            <div className="z-10 text-center relative pointer-events-none w-full flex flex-col items-center justify-center min-h-[60vh] md:min-h-0 md:block md:w-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                delayChildren: 2.0,
                                staggerChildren: 0.3
                            }
                        }
                    }}
                >
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
                            visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="absolute top-[35%] left-0 w-full flex justify-center pointer-events-auto z-50 md:static md:w-auto md:mb-8 md:z-auto"
                    >
                        <div className="transform scale-[0.6] md:scale-100 origin-center relative overflow-hidden bg-white/5 border border-white/10 rounded-full px-4 py-1.5 flex items-center gap-2 backdrop-blur-md shadow-lg shadow-purple-500/10">
                            {/* Animated Shine Overlay */}
                            <motion.div
                                className="absolute inset-0 top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                                animate={{ left: ['-100%', '200%'] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: "linear",
                                    repeatDelay: 1.5
                                }}
                            />

                            <span className="text-xs font-medium text-white/50 relative z-50">///</span>
                            <span className="text-sm text-white/90 relative z-90">{t('hero.subtitle')}</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        variants={{
                            hidden: { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
                            visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="absolute top-[40%] left-0 w-full text-3xl md:text-7xl font-display font-bold tracking-tight px-4 text-center text-white z-40 md:static md:w-auto md:mb-8 md:z-auto"
                    >
                        {t('hero.title_start')} <AuroraText>{t('hero.title_highlight')}</AuroraText>
                    </motion.h1>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
                            visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="absolute bottom-[20%] left-0 w-full flex gap-4 justify-center items-center pointer-events-auto md:static md:w-auto md:mt-0"
                    >
                        <Link to="/solutions">
                            <button className="bg-white text-black px-6 py-2 md:px-8 md:py-4 rounded-full font-medium hover:bg-gray-200 transition-colors shadow-xl shadow-white/10">
                                {t('hero.cta_solutions')}
                            </button>
                        </Link>
                        <Link to="/contact">
                            <button className="bg-white/5 border border-white/10 text-white px-6 py-2 md:px-8 md:py-4 rounded-full font-medium hover:bg-white/10 transition-colors backdrop-blur-md">
                                {t('hero.cta_contact')}
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

const Quiz = () => {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    // Updated state type to match new generator output (keys)
    const [analysisResult, setAnalysisResult] = useState<{ mainTextKeys: string[], subTextKeys: string[], tags: string[] } | null>(null);
    const navigate = useNavigate();

    const handleOptionClick = (option: string) => {
        const newAnswers = { ...answers, [step]: option };
        setAnswers(newAnswers);

        if (step < QUIZ_IDS.length) {
            setStep(step + 1);
        } else {
            // Generate Analysis instead of navigating
            // Using a timeout to simulate "processing" for better UX
            setTimeout(() => {
                const result = generateAnalysis(newAnswers);
                setAnalysisResult(result);
            }, 600);
        }
    };

    const steps = t('quiz.steps', { returnObjects: true }) as Record<string, { id: number, question: string, options: string[] }>;
    const currentQuestion = steps[step.toString()];

    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden" id="quiz-section">
            <div className="container mx-auto px-6 text-center">
                <SplitText text={t('quiz.pre_title')} className="text-sm font-mono text-blue-500 mb-4 tracking-widest uppercase" />
                <h2 className="text-4xl font-display font-bold mb-12">{t('quiz.title')}</h2>

                {!analysisResult && <Stepper steps={QUIZ_IDS.map(id => ({ id }))} currentStep={step} />}

                <div className="max-w-3xl mx-auto mt-12 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl relative z-10 overflow-hidden">
                    <AnimatePresence mode='wait'>
                        {analysisResult ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="text-left"
                            >
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {analysisResult.tags.map((tag, i) => (
                                        <span key={i} className="text-xs font-mono py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                                    {analysisResult.mainTextKeys.map(key => t(key)).join(' ')}
                                </h3>
                                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                    {analysisResult.subTextKeys.map(key => t(key)).join(' ')}
                                </p>

                                <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 mb-8">
                                    <h4 className="font-bold mb-2">Empfohlener nächster Schritt:</h4>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Basierend auf Ihrer Situation ("{answers[3]}") empfehlen wir eine gezielte Prozess-Analyse.
                                    </p>
                                    <Link to="/contact">
                                        <button className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg font-bold hover:scale-[1.02] transition-transform shadow-lg">
                                            Kostenloses Strategiegespräch anfordern
                                        </button>
                                    </Link>
                                </div>
                                <p className="text-xs text-center text-gray-400">
                                    Unverbindlich & Kostenlos. Wir sparen Ihnen Zeit, keine Nerven.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-2xl font-medium mb-8">{currentQuestion?.question}</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {currentQuestion?.options.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleOptionClick(opt)}
                                            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all text-left flex justify-between group"
                                        >
                                            <span>{opt}</span>
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

const ProcessStack = () => {
    const { t } = useTranslation();
    const stackItems = t('process.steps', { returnObjects: true }) as { title: string, desc: string }[];

    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">{t('process.title')}</h2>
                    <p className="text-xl text-gray-500 max-w-xl">{t('process.subtitle')}</p>
                </div>
                <ScrollStack items={stackItems} />
            </div>
        </section>
    );
}

import { IndustryShowcase } from '../components/IndustryShowcase';

export default function Home() {
    const { t } = useTranslation();
    return (
        <>
            <Hero />
            <ProcessStack />
            <IndustryShowcase />
            <section className="py-24 border-y border-gray-100 dark:border-gray-900">
                <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { label: t('metrics.processes'), val: 500, suffix: '+' },
                        { label: t('metrics.hours'), val: 200, suffix: 'k+' },
                        { label: t('metrics.roi'), val: 12, suffix: 'x' },
                        { label: t('metrics.security'), val: 100, suffix: '%' },
                    ].map((metric, i) => (
                        <div key={i}>
                            <div className="text-4xl md:text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-gray-400 dark:from-white dark:to-gray-600">
                                <CountUp to={metric.val} suffix={metric.suffix} />
                            </div>
                            <div className="text-sm font-mono text-gray-500 uppercase">{metric.label}</div>
                        </div>
                    ))}
                </div>
            </section>
            <Quiz />
            <div className="bg-black text-white py-12 text-center">
                <div className="container mx-auto">
                    <p className="text-gray-400 text-sm max-w-3xl mx-auto">
                        Automation durch AI hat bewiesenermaßen Firmen auf der ganzen Welt geholfen, ihre Effizienz zu steigern und ihre Kosten zu senken.
                    </p>
                </div>
            </div>
        </>
    );
}