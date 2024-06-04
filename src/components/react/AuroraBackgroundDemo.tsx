import { AuroraBackground } from './aceternityui/AuroraBackground';
import React from 'react';
import { motion } from 'framer-motion';

export function AuroraBackgroundDemo() {
  return (
    // <AuroraBackground>
    <div className="relative flex flex-col  h-lvh items-center justify-center  text-slate-950 transition-bg">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">VirgosDesign</div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          somewhere next to heaven
        </div>
        <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
          Get Started
        </button>
      </motion.div>
    </div>
    // </AuroraBackground>
  );
}
