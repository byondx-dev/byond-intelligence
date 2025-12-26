import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuroraText } from './AnimatedUI';
import { useTranslation } from 'react-i18next';

export default function WelcomeScreen({ onComplete }: { onComplete: () => void }) {
    const { t } = useTranslation();
    const [step, setStep] = useState(0); // 0: Init, 1: Text, 2: Loader, 3: FadeOutContent, 4: Complete

    useEffect(() => {
        const s1 = setTimeout(() => setStep(1), 100); // Start Text
        const s2 = setTimeout(() => setStep(2), 800); // Start Loader
        const s3 = setTimeout(() => setStep(3), 2500); // Fade Out Content (Text+Loader)
        const s4 = setTimeout(() => onComplete(), 3200); // Signal Complete (Parent fades BG)

        return () => {
            clearTimeout(s1); clearTimeout(s2); clearTimeout(s3); clearTimeout(s4);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.0, ease: "easeInOut" } }}
        >
            <AnimatePresence>
                {step >= 1 && step < 3 && (
                    <motion.div
                        className="flex flex-col items-center justify-center gap-12"
                        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Main Text - Fixed position relative to center */}
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-white text-center z-10">
                            {t('welcome.title_start')} <AuroraText>{t('welcome.title_highlight')}</AuroraText>
                        </h1>

                        {/* AI Loader - Always present in DOM to reserve space, but invisible globally until step 2 */}
                        <div className="relative w-16 h-16 flex items-center justify-center">
                            {step >= 2 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                >
                                    {/* Pulsing Core */}
                                    <motion.div
                                        className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-50"
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    />

                                    {/* Rotating Rings */}
                                    <motion.div
                                        className="absolute inset-0 border-2 border-t-white/80 border-r-white/20 border-b-white/20 border-l-white/80 rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    />
                                    <motion.div
                                        className="absolute inset-2 border-2 border-t-purple-500/80 border-r-transparent border-b-purple-500/80 border-l-transparent rounded-full"
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    />
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
