import { HoverBorder } from './aceternityui/HoverBorder';
import React from 'react';

export function HoverBorderDemo() {
  return (
    <div className="m-40 flex justify-center text-center">
      <HoverBorder
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
      >
        <span>Virgos Design</span>
      </HoverBorder>
    </div>
  );
}

