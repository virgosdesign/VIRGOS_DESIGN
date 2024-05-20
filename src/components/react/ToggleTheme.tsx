import React, { Fragment } from 'react';

import { IconSun } from '@tabler/icons-react';
import { UI } from 'astrowind:config';
import { motion } from 'framer-motion';

export function ToggleTheme() {
  return (
    <Fragment>
      {!(UI.theme && UI.theme.endsWith(':only')) && (
        <button type="button" data-aw-toggle-color-scheme>
          <IconSun className="h-4 w-4 text-neutral-500 dark:text-white" />
        </button>
      )}
    </Fragment>
  );
}
