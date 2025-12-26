import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
    ShoppingBagIcon, ShoppingCartIcon,
    BuildingOfficeIcon as OfficeBuildingIcon, AcademicCapIcon, CpuChipIcon as ChipIcon, ScaleIcon,
    ArrowTrendingUpIcon as TrendingUpIcon, UserGroupIcon, ClockIcon, ShieldCheckIcon,
    HeartIcon
} from '@heroicons/react/24/outline';
import Orb from './Orb';
import { AuroraText } from './AnimatedUI';

// --- Custom SVGs ---
const ServingDishIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
); // Using Sparkling/Star as fallback "Magic Platter" abstract or create real dish path if preferred. 
// Actually, a real serving dish path:
const ServingPlateIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        {/* Placeholder Bolt - Replaced below with actual Plate */}
    </svg>
);
// Real Plate Path from memory/basic shapes
const RealServingPlateIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-6v6m-15-6v6" />
        {/* Wait, let's use a cloche/dome path */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a7.5 7.5 0 00-7.5 7.5h15A7.5 7.5 0 0012 9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9V6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 19h20" />
    </svg>
);


// --- Types ---
type Theme = {
    gradient: string;
    bg: string;
    border: string;
    shadow: string;
    text: string;
    hue: number;
};

// --- Themes Configuration ---
const THEMES: Record<string, Theme> = {
    gastro: {
        gradient: "from-amber-500 via-orange-500 to-yellow-500",
        bg: "bg-amber-50 dark:bg-amber-500/5", // Removed opacity for light mode
        border: "border-amber-200 dark:border-amber-500/10",
        shadow: "shadow-amber-500/10",
        text: "text-amber-700 dark:text-amber-500", // Darker text for light mode
        hue: 35
    },
    fashion: {
        gradient: "from-pink-500 via-rose-500 to-fuchsia-600",
        bg: "bg-pink-50 dark:bg-pink-500/5",
        border: "border-pink-200 dark:border-pink-500/10",
        shadow: "shadow-pink-500/10",
        text: "text-pink-700 dark:text-pink-500",
        hue: 340
    },
    care: {
        gradient: "from-cyan-400 via-teal-500 to-emerald-500",
        bg: "bg-cyan-50 dark:bg-cyan-500/5",
        border: "border-cyan-200 dark:border-cyan-500/10",
        shadow: "shadow-cyan-500/10",
        text: "text-cyan-700 dark:text-cyan-500",
        hue: 180
    },
    supermarket: {
        gradient: "from-green-400 via-emerald-500 to-lime-600",
        bg: "bg-green-50 dark:bg-green-500/5",
        border: "border-green-200 dark:border-green-500/10",
        shadow: "shadow-green-500/10",
        text: "text-green-700 dark:text-green-500",
        hue: 140
    },
    construction: {
        gradient: "from-yellow-400 via-orange-500 to-amber-600",
        bg: "bg-yellow-50 dark:bg-yellow-500/5",
        border: "border-yellow-200 dark:border-yellow-500/10",
        shadow: "shadow-yellow-500/10",
        text: "text-yellow-700 dark:text-yellow-500",
        hue: 40
    },
    public: {
        gradient: "from-blue-500 via-indigo-500 to-violet-600",
        bg: "bg-blue-50 dark:bg-blue-500/5",
        border: "border-blue-200 dark:border-blue-500/10",
        shadow: "shadow-blue-500/10",
        text: "text-blue-700 dark:text-blue-500",
        hue: 230
    },
    robotics: {
        gradient: "from-violet-500 via-purple-600 to-indigo-700",
        bg: "bg-violet-50 dark:bg-violet-500/5",
        border: "border-violet-200 dark:border-violet-500/10",
        shadow: "shadow-violet-500/10",
        text: "text-violet-700 dark:text-violet-500",
        hue: 260
    },
    finance: {
        gradient: "from-slate-500 via-gray-600 to-zinc-700",
        bg: "bg-gray-100 dark:bg-gray-500/5", // Gray-100 for finance light
        border: "border-gray-200 dark:border-gray-500/10",
        shadow: "shadow-gray-500/10",
        text: "text-gray-700 dark:text-gray-400",
        hue: 210
    }
};

const ICONS: Record<string, any> = {
    // General Mappings for visual variety
    gastro: RealServingPlateIcon,
    fashion: ShoppingBagIcon,
    care: HeartIcon,
    supermarket: ShoppingCartIcon,
    construction: OfficeBuildingIcon,
    public: AcademicCapIcon,
    robotics: ChipIcon,
    finance: ScaleIcon,
    // Feature icon mappings 
    c1: TrendingUpIcon,
    c2: UserGroupIcon,
    c3: ClockIcon,
    c4: ShieldCheckIcon
};

// --- Sub-Components ---
// Updated BentoItem to accept style prop for motion values
const BentoItem = ({
    title, desc, icon: Icon, theme, delay, spanClass = "", position = "none", style = {}
}: {
    title: string; desc: string; icon: any; theme: Theme; delay: number; spanClass?: string; position?: "tl" | "tr" | "bl" | "br" | "none"; style?: any
}) => {
    // Helper to determine layout classes based on position
    const getLayoutClasses = () => {
        switch (position) {
            case "tl": return "items-start text-left justify-start";
            case "tr": return "items-end text-right justify-start";
            case "bl": return "items-start text-left justify-end";
            case "br": return "items-end text-right justify-end";
            default: return "items-center text-center lg:items-start lg:text-left justify-start";
        }
    };

    // Concave Mask Logic for 2x2 Cluster
    const getMaskStyle = () => {
        const radius = "60px";
        const jagged = "61px";

        switch (position) {
            case "tl": // Cutout Bottom Right
                return {
                    WebkitMaskImage: `radial-gradient(circle at 100% 100%, transparent ${radius}, black ${jagged})`,
                    maskImage: `radial-gradient(circle at 100% 100%, transparent ${radius}, black ${jagged})`
                };
            case "tr": // Cutout Bottom Left
                return {
                    WebkitMaskImage: `radial-gradient(circle at 0% 100%, transparent ${radius}, black ${jagged})`,
                    maskImage: `radial-gradient(circle at 0% 100%, transparent ${radius}, black ${jagged})`
                };
            case "bl": // Cutout Top Right
                return {
                    WebkitMaskImage: `radial-gradient(circle at 100% 0%, transparent ${radius}, black ${jagged})`,
                    maskImage: `radial-gradient(circle at 100% 0%, transparent ${radius}, black ${jagged})`
                };
            case "br": // Cutout Top Left
                return {
                    WebkitMaskImage: `radial-gradient(circle at 0% 0%, transparent ${radius}, black ${jagged})`,
                    maskImage: `radial-gradient(circle at 0% 0%, transparent ${radius}, black ${jagged})`
                };
            default:
                return {};
        }
    };

    return (
        <motion.div
            style={{ ...getMaskStyle(), ...style }}
            className={`group relative p-4 md:p-6 rounded-3xl border ${theme.border} ${theme.bg} dark:bg-zinc-900/50 backdrop-blur-sm hover:border-white/20 dark:hover:border-white/20 transition-all hover:shadow-2xl ${theme.shadow} ${spanClass} overflow-hidden flex flex-col ${getLayoutClasses()} md:![mask-image:none] md:![webkit-mask-image:none]`}
        >
            {/* Hover Spotlight */}
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 transition-opacity duration-700`} />

            <div className={`relative z-10 w-full flex flex-col ${getLayoutClasses()} h-full`}>
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br ${theme.gradient} p-0.5 mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full bg-white dark:bg-black rounded-[14px] flex items-center justify-center">
                        <Icon className={`w-5 h-5 md:w-6 md:h-6 ${theme.text}`} />
                    </div>
                </div>

                <h4 className="text-sm md:text-xl font-bold mb-1 md:mb-2 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-colors">
                    {title}
                </h4>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {desc}
                </p>
            </div>
        </motion.div>
    );
};

const IndustrySection = ({ ind, index, t }: { ind: string, index: number, t: any }) => {
    const theme = THEMES[ind] || THEMES.gastro;
    const MainIcon = ICONS[ind];
    const isEven = index % 2 === 0;

    // Scroll Animation Hooks
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Mobile Animation Values (Docking Effect)
    // 0.2 (Enter) -> 0.5 (Docked) -> 0.8 (Exit)
    const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0.8, 1, 1, 0.8]);
    const blurVal = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [10, 0, 0, 10]);
    const filter = useTransform(blurVal, (v) => `blur(${v}px)`);

    const offset = 50;
    // TL: -x, -y
    const xTL = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [-offset, 0, 0, -offset]);
    const yTL = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [-offset, 0, 0, -offset]);

    // TR: +x, -y
    const xTR = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [offset, 0, 0, offset]);
    const yTR = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [-offset, 0, 0, -offset]);

    // BL: -x, +y
    const xBL = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [-offset, 0, 0, -offset]);
    const yBL = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [offset, 0, 0, offset]);

    // BR: +x, +y
    const xBR = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [offset, 0, 0, offset]);
    const yBR = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [offset, 0, 0, offset]);

    return (
        <div ref={containerRef} className="relative">
            {/* Decorator Line */}
            <div className={`absolute top-0 ${isEven ? 'left-8' : 'right-8'} w-0.5 h-full bg-gradient-to-b ${theme.gradient} opacity-20 hidden lg:block`} />

            <div className="grid lg:grid-cols-12 gap-8 items-start">

                {/* Sidebar / Header Config */}
                <div className={`lg:col-span-4 relative lg:sticky lg:top-32 flex flex-col items-center text-center ${isEven ? 'lg:order-1 lg:items-start lg:text-left' : 'lg:order-2 lg:items-end lg:text-right'}`}>
                    <motion.div
                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${theme.gradient} bg-opacity-10 mb-6`}>
                            <MainIcon className="w-8 h-8 text-white mix-blend-overlay" />
                        </div>
                        <h3 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-gray-500 text-gray-900 dark:text-white pb-2 leading-tight">
                            {t(`industries.${ind}.title`)}
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 border-l-4 border-gray-100 dark:border-gray-800 pl-4">
                            {t(`industries.${ind}.desc`)}
                        </p>

                        <Link to="/solutions">
                            <button className={`hidden lg:inline-flex items-center gap-2 px-6 py-3 rounded-full border ${theme.border} ${theme.text} hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-sm font-semibold bg-white dark:bg-transparent`}>
                                Learn more <span aria-hidden="true">→</span>
                            </button>
                        </Link>
                    </motion.div>
                </div>

                {/* Bento Grid Layout */}
                <div className={`lg:col-span-8 ${isEven ? 'lg:order-2' : 'lg:order-1 start'}`}>
                    <div className="relative">

                        {/* MOBILE GRID With Central Orb - 2x2 Cluster */}
                        <div className="grid grid-cols-2 gap-2 md:hidden relative min-h-[400px]">

                            {/* Absolutely Positioned Central Orb */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 flex items-center justify-center pointer-events-none w-24 h-24">
                                <div className="scale-125 opacity-90 w-full h-full">
                                    <Orb hue={theme.hue} hoverIntensity={0.3} colorMode="industry" />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <AuroraText className="text-xl font-bold opacity-90">AI</AuroraText>
                                </div>
                            </div>

                            {/* Top Left - c1 */}
                            <BentoItem
                                title={t(`industries.${ind}.c1.title`, "")}
                                desc={t(`industries.${ind}.c1.desc`, "")}
                                icon={ICONS.c1} theme={theme} delay={0.1}
                                spanClass="col-span-1 h-64"
                                position="tl"
                                style={{ opacity, scale, filter, x: xTL, y: yTL }}
                            />

                            {/* Top Right - c2 */}
                            <BentoItem
                                title={t(`industries.${ind}.c2.title`, "")}
                                desc={t(`industries.${ind}.c2.desc`, "")}
                                icon={ICONS.c2} theme={theme} delay={0.2}
                                spanClass="col-span-1 h-64"
                                position="tr"
                                style={{ opacity, scale, filter, x: xTR, y: yTR }}
                            />

                            {/* Bottom Left - c3 */}
                            <BentoItem
                                title={t(`industries.${ind}.c3.title`, "")}
                                desc={t(`industries.${ind}.c3.desc`, "")}
                                icon={ICONS.c3} theme={theme} delay={0.3}
                                spanClass="col-span-1 h-64"
                                position="bl"
                                style={{ opacity, scale, filter, x: xBL, y: yBL }}
                            />

                            {/* Bottom Right - c4 */}
                            <BentoItem
                                title={t(`industries.${ind}.c4.title`, t('c4.title'))}
                                desc={t(`industries.${ind}.c4.desc`, t('c4.desc'))}
                                icon={ICONS.c4} theme={theme} delay={0.4}
                                spanClass="col-span-1 h-64"
                                position="br"
                                style={{ opacity, scale, filter, x: xBR, y: yBR }}
                            />
                        </div>

                        {/* DESKTOP GRID - Traditional Bento */}
                        <div className="hidden md:grid grid-cols-3 gap-4 auto-rows-[200px]">
                            <BentoItem
                                title={t(`industries.${ind}.c1.title`, t('c1.title'))}
                                desc={t(`industries.${ind}.c1.desc`, t('c1.desc'))}
                                icon={ICONS.c1} theme={theme} delay={0.1}
                                spanClass="col-span-2 row-span-1"
                            />
                            <BentoItem
                                title={t(`industries.${ind}.c2.title`, t('c2.title'))}
                                desc={t(`industries.${ind}.c2.desc`, t('c2.desc'))}
                                icon={ICONS.c2} theme={theme} delay={0.2}
                                spanClass="col-span-1 row-span-1"
                            />
                            <BentoItem
                                title={t(`industries.${ind}.c3.title`, t('c3.title'))}
                                desc={t(`industries.${ind}.c3.desc`, t('c3.desc'))}
                                icon={ICONS.c3} theme={theme} delay={0.3}
                                spanClass="col-span-1 row-span-1"
                            />
                            <BentoItem
                                title={t(`industries.${ind}.c4.title`, t('c4.title'))}
                                desc={t(`industries.${ind}.c4.desc`, t('c4.desc'))}
                                icon={ICONS.c4} theme={theme} delay={0.4}
                                spanClass="col-span-2 row-span-1"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---
export const IndustryShowcase = () => {
    const { t } = useTranslation();

    // Order of industries to display
    const INDUSTRIES = ['gastro', 'fashion', 'care', 'supermarket', 'construction', 'public', 'robotics', 'finance'];

    return (
        <section className="py-32 bg-white dark:bg-black relative">
            <div className="container mx-auto px-6">

                {/* Main Section Header */}
                <div className="mb-24 text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden inline-block mb-4 px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900"
                    >
                        {/* Shimmer Effect */}
                        <motion.div
                            className="absolute inset-0 top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent -skew-x-12"
                            animate={{ left: ['-100%', '200%'] }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "linear",
                                repeatDelay: 1.5
                            }}
                        />
                        <span className="relative z-10 text-sm font-semibold text-gray-900 dark:text-white">
                            Industries
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight text-gray-900 dark:text-white"
                    >
                        {t('industries.title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="text-xl text-gray-500 dark:text-gray-400"
                    >
                        {t('industries.subtitle')}
                    </motion.p>
                </div>

                {/* Industry Grids Stack */}
                <div className="space-y-32">
                    {INDUSTRIES.map((ind, index) => (
                        <IndustrySection key={ind} ind={ind} index={index} t={t} />
                    ))}
                </div>

            </div>
        </section>
    );
};

