import { IconHome, IconMessages, IconTriangleInverted, IconUser } from '@tabler/icons-react';

import { FloatingNav } from './aceternityui/FloatingNav';
import React from 'react';
//import { Icon } from 'astro-icon/components'
import { ToggleTheme } from './ToggleTheme';

//import ToggleTheme from '~/components/common/ToggleTheme.astro';

export function FloatingNavDemo() {
  const navItems = [
    {
      name: 'Home',
      link: '/',
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: 'About',
      link: '#about',
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: 'Services',
      link: '#services',
      icon: <IconTriangleInverted className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: 'Contact',
      link: '#contact',
      icon: <IconMessages className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];
  return (
    <div className="w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
