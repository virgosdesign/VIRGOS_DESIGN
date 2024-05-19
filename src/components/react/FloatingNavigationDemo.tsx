import { IconHome, IconMessage, IconUser } from '@tabler/icons-react';

import { FloatingNav } from './aceternityui/FloatingNav';
//import { Icon } from 'astro-icon/components'
import React from 'react';

export function FloatingNavDemo() {
  const navItems = [
    {
      name: 'Home',
      link: '/',
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: 'About',
      link: '/about',
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: 'Contact',
      link: '/contact',
      icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];
  return (
    <div className="w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
