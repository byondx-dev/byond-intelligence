import React from 'react';
import { BlurText } from '../components/AnimatedUI';
import HeroOrb from '../components/HeroOrb';
import StarBorder from '../components/StarBorder';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[60rem] h-[60rem] opacity-30 pointer-events-none transform translate-x-1/2 -translate-y-1/2">
        <HeroOrb />
      </div>
      <div className="absolute bottom-0 left-0 w-[60rem] h-[60rem] opacity-20 pointer-events-none transform -translate-x-1/2 translate-y-1/2">
        <HeroOrb />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tight">
          <BlurText text={t('contact.hero_title')} className="block" />
        </h1>

        <p className="text-xl md:text-2xl text-gray-500 mb-16 max-w-2xl leading-relaxed">
          {t('contact.hero_subtitle')}
        </p>

        <StarBorder
          as="a"
          href="https://outlook.office.com/book/MeetingwithByondIntelligence@byondx.app/?ismsaljsauthenabled"
          target="_blank"
          rel="noopener noreferrer"
          color="cyan"
          speed="4s"
          thickness={4}
          className="text-lg md:text-xl font-bold"
        >
          <span>{t('contact.book_call')}</span>
          <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center group-hover:translate-x-1 transition-transform">
            →
          </span>
        </StarBorder>

        {/* Optional decorative checklist or trust indicators below if needed, keeping it clean for now as requested */}
      </div>
    </div>
  );
}