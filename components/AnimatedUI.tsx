import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';

// --- 1. Stepper (Mandatory) ---
interface StepperProps {
  steps: { id: number; label?: string }[];
  currentStep: number;
}
export const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="flex justify-between items-center w-full max-w-xl mx-auto mb-8 relative">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 -z-10 -translate-y-1/2 rounded-full" />
      <div
        className="absolute top-1/2 left-0 h-1 bg-primary -z-10 -translate-y-1/2 rounded-full transition-all duration-500"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />
      {steps.map((step) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;
        return (
          <div key={step.id} className="relative flex flex-col items-center group">
            <motion.div
              initial={false}
              animate={{
                scale: isActive ? 1.2 : 1,
                backgroundColor: isActive || isCompleted ? '#3B82F6' : '#E5E7EB',
                borderColor: isActive ? '#3B82F6' : 'transparent',
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${isActive || isCompleted ? 'text-white' : 'text-gray-500 dark:text-gray-400 dark:bg-gray-800'}`}
            >
              {isCompleted ? '✓' : step.id}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

// --- 2. ScrollStack (Mandatory) ---
export const ScrollStack = ({ items }: { items: { title: string; desc: string }[] }) => {
  return (
    <div className="relative w-full py-20 flex flex-col gap-32">
      {items.map((item, i) => (
        <ScrollStackCard key={i} item={item} index={i} total={items.length} />
      ))}
    </div>
  );
};

const ScrollStackCard: React.FC<{ item: any, index: number, total: number }> = ({ item, index, total }) => {
  // Simulating the stack effect with sticky positioning
  return (
    <motion.div
      className="sticky top-32 mx-auto w-full max-w-4xl p-8 rounded-3xl border border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/50 dark:bg-black/40 shadow-2xl overflow-hidden"
      style={{
        zIndex: index,
        top: `calc(100px + ${index * 20}px)`
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-4xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500">
            0{index + 1}. {item.title}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">{item.desc}</p>
        </div>
        <div className="h-48 md:h-64 rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center relative overflow-hidden group">
          <span className="text-gray-400 font-mono text-sm">BILD: {item.title} Process</span>
          {/* Decorative overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </motion.div>
  );
}

// --- 3. BlurText ---
export const BlurText = ({ text, className = "", delay = 0 }: { text: string; className?: string, delay?: number }) => {
  const words = text.split(" ");
  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: delay + i * 0.1, ease: "easeOut" }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

// --- 4. SpotlightCard ---
export const SpotlightCard: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = "" }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59,130,246,0.1), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// --- 5. ShinyText ---
export const ShinyText = ({ text }: { text: string }) => {
  return (
    <span className="bg-clip-text text-transparent bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] dark:bg-[linear-gradient(110deg,#939393,45%,#ffffff,55%,#939393)] bg-[length:250%_100%] animate-[shimmer_3s_infinite] font-medium">
      {text}
    </span>
  );
};

// --- 6. Magnet Button ---
export const Magnet: React.FC<{ children: ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  }

  const reset = () => setPosition({ x: 0, y: 0 });

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

// --- 7. SplitText (Lines) ---
export const SplitText = ({ text, className }: { text: string, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {text}
    </motion.div>
  )
}

// --- 8. TiltedCard (3D Tilt effect) ---
export const TiltedCard: React.FC<{ children: ReactNode }> = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  return (
    <motion.div
      style={{ perspective: 1000 }}
      className="w-full"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={onMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        className="w-full h-full transform-gpu transition-all duration-200"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// --- 9. TrueFocus (Input Field) ---
export const TrueFocus = ({ placeholder, type = "text", ...props }: any) => {
  return (
    <div className="relative group">
      <input
        type={type}
        className="w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-700 py-3 px-1 text-lg outline-none focus:border-blue-500 transition-colors duration-300 peer text-gray-800 dark:text-gray-100 placeholder-transparent"
        placeholder={placeholder}
        id={placeholder} // Simple ID for label matching
        {...props}
      />
      <label
        htmlFor={placeholder}
        className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-gray-500 peer-focus:text-sm"
      >
        {placeholder}
      </label>
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 peer-focus:w-full" />
    </div>
  )
}

// --- 10. BorderBeam ---
export const BorderBeam = () => {
  return (
    <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-[80px] animate-blob mix-blend-screen" />
    </div>
  )
}

// --- 11. CountUp (Simple numeric animation) ---
export const CountUp = ({ to, suffix = "" }: { to: number, suffix?: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    let start = 0;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / to));

    const timer = setInterval(() => {
      start += 1;
      node.textContent = String(start) + suffix;
      if (start === to) clearInterval(timer);
    }, stepTime > 0 ? stepTime : 10);

    return () => clearInterval(timer);
  }, [to, suffix]);

  return <span ref={nodeRef} className="font-bold font-mono">0</span>;
}

// --- 12. AnimatedList ---
export const AnimatedList = ({ items }: { items: string[] }) => {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          {item}
        </motion.div>
      ))}
    </div>
  )
}
// --- 13. AuroraText (Custom Shine) ---
export const AuroraText = ({ children, className = "", speed = 5 }: { children: ReactNode, className?: string, speed?: number }) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`bg-clip-text text-transparent inline-block animate-hue-cycle ${className}`}
      style={{
        backgroundImage: 'linear-gradient(135deg, #FFFFFF 0%, #a78bfa 25%, #3b82f6 50%, #a78bfa 75%, #FFFFFF 100%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration
      }}
    >
      {children}
    </span>
  );
};