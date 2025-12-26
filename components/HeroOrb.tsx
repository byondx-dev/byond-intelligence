import React, { useContext } from 'react';
import Orb from './Orb';
import { ThemeContext } from '../index'; // Will be defined in index.tsx

export default function HeroOrb() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] md:w-[80vw] md:h-[80vw] max-w-[1000px] max-h-[1000px] opacity-100 transition-opacity duration-1000 [mask-image:radial-gradient(closest-side,black_100%,transparent_100%)]">
        <Orb
          hue={24}
          backgroundColor={isDark ? '#000000' : '#F5F6F8'}
          hoverIntensity={1.51}
          rotateOnHover={true}
        />
      </div>
    </div>
  );
}