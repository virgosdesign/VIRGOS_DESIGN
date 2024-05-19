import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import React, { useState } from 'react';

import { classNames } from '@utils/utils';

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);
  const [position, setPosition] = useState('absolute');
  const [placement, setPlacement] = useState('bottom-20');

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    const page = document.documentElement;
    const nav = document.querySelector('#floating-nav') as HTMLElement;
    const X = page.clientHeight - page.scrollTop - nav.offsetHeight - 200;
    const Y = page.clientHeight - page.scrollTop;
    console.log('X', X);
    console.log('Y', Y);
    // Check if current is not undefined and is a number
    if (typeof current === 'number') {
      let direction = current! - scrollYProgress.getPrevious()!;
      if (direction > 0) {
        console.log('Scrolling down');
        console.log('current', current);
        console.log('scrollYProgress.get()', scrollYProgress.get());
        console.log('X', X)// - nav.offsetHeight)
        console.log('NAV TOP POSITION:', nav.offsetTop)
        if (X < 0){
          console.log('Set fixed');
          setPosition('fixed');
          setPlacement('top-20');
          //setVisible(false);
        }
        if (Y < 0){
          console.log('Set invisible <<<<<  A');
          setVisible(false);
        }
      
        
      } else {
        console.log('Scrolling up');
        setVisible(true);
        if (X >= 0){
          console.log('Set absolute');
          setPosition('absolute');
          setPlacement('bottom-20');
        }
      }

      // if (scrollYProgress.get() < 0.05) {
      //   console.log('Set invisible <<<<<  A');
      //   //setVisible(false);
      // } else {
      //   if (direction < 0) {
      //     console.log('Set visible >>>>>>>>>>>>>>');
      //     //setVisible(true);
      //   } else {
      //     console.log('Set invisible <<<<<  B');
      //     //setVisible(false);
      //   }
      // }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        id='floating-nav'
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={classNames(
          `flex max-w-fit ${position} ${placement} z-50 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2  items-center justify-center space-x-4`,
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <a
            key={`link=${idx}`}
            href={navItem.link}
            className={classNames(
              'relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500'
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </a>
        ))}
        <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
          <span>Login</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
