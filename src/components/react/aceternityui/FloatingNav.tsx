import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { ToggleTheme } from '../ToggleTheme';
import { classNames } from '@utils/utils';

type NavItem = {
  name: string;
  link: string;
  icon?: JSX.Element;
};

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: NavItem[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [leftNavigation, setLeftNavigation] = useState<NavItem[]>([]);
  const [rightNavigation, setRightNavigation] = useState<NavItem[]>([]);
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [position, setPosition] = useState('absolute');
  const [placement, setPlacement] = useState('bottom-20');
  const [shadow, setShadow] = useState('shadow-none');
  const [blur, setBlur] = useState('backdrop-blur-none');
  const [background, setBackground] = useState('bg-none');
  const [border, setBorder] = useState('border border-transparent dark:border-transparent');

  useEffect(() => {
    const half = Math.ceil(navItems.length / 2);
    const left = navItems.slice(0, half);
    const right = navItems.slice(half, navItems.length);
    setLeftNavigation(left);
    setRightNavigation(right);
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    const page = document.documentElement;
    const nav = document.querySelector('#floating-nav') as HTMLElement;
    const positionDelta = 200; // For large screens, nav placment differential is bottom-20/top-20, a 200px difference
    const X = page.clientHeight - page.scrollTop - nav.offsetHeight - positionDelta;
    const Y = page.clientHeight - page.scrollTop;

    // Check if current is not undefined and is a number
    if (typeof current === 'number') {
    console.log("Current:", current)
      if (current === 0) { // Reset the styles to initial (invisible borders, no shadow, no blur, no background)
        setShadow('shadow-none');
        setBlur('backdrop-blur-none');
        setBorder('border-transparent dark:border-transparent');
      }
      let direction = current! - scrollYProgress.getPrevious()!;
      if (direction > 0) { // Style the navigation so that it is a visible overlay
        console.log('Scrolling down');
        setShadow(
          'shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'
        );
        if (X < 0){ // Once nav reaches top of screen, fix it there
          console.log('Set fixed');
          setPosition('fixed');
          setPlacement('top-20');
          setShadow(
            'shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'
          );
          setBlur('backdrop-blur-lg');
          setBorder('dark:border-slate-600')
        }
        if (Y < -(page.clientHeight/2)) { // Once nav reaches bottom of screen, apply cloaking transformation
          setExpanded(false);
          //setVisible(false);
        }
      } else {
        console.log('Scrolling up');
        //setVisible(true);
        setExpanded(true);
        if (X >= 0){
          console.log('set sticky')
          setPosition('absolute');
          setPlacement('bottom-20');
          // setShadow('shadow-none');
          // setBlur('backdrop-blur-none');
          // setBorder('border-transparent dark:border-transparent')
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        id="floating-nav"
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.7,
        }}
        className={classNames(
          `flex max-w-fit border ${border} ${position} ${placement} ${shadow} ${blur} ${background} inset-x-0 mx-auto border rounded-full z-[5000] px-6 py-2 items-center justify-center space-x-4`,
          className
        )}
      >
        {expanded && 
        <AnimatePresence mode="wait">
        {leftNavigation.map((navItem: any, idx: number) => (
          <motion.a
            key={`link=${idx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            //exit={{ opacity: 1 }}
            href={navItem.link}
            className={classNames(
              'relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500'
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </motion.a>
        ))}
        </AnimatePresence>
        }
        <ToggleTheme />
        {/* <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"> */}
        <span className="text-sm">Login</span>
        {expanded && rightNavigation.map((navItem: any, idx: number) => (
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
        {/* <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" /> */}
        {/* </button> */}
      </motion.div>
      {/* <motion.div
        id="hamburger"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: visible ? 0 : 1,
        }}
        transition={{
          duration: 0.7,
        }}
        className={classNames(
          `flex max-w-fit border ${border} ${position} ${placement} ${shadow} ${blur} ${background} inset-x-0 mx-auto border rounded-full z-[5000] px-6 py-2 items-center justify-center space-x-4`,
          className
        )}
      >
        Logo
      </motion.div> */}
    </AnimatePresence>
  );
};
