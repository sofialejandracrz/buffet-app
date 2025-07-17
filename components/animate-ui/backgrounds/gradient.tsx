'use client';

import * as React from 'react';
import { HTMLMotionProps, motion, type Transition } from 'motion/react';

import { cn } from '@/lib/utils';

type GradientBackgroundProps = HTMLMotionProps<'div'> & {
  transition?: Transition;
};

function GradientBackground({
  className,
  transition = { duration: 15, ease: 'easeInOut', repeat: Infinity },
  ...props
}: GradientBackgroundProps) {
  return (
    <motion.div
      data-slot="gradient-background"
      className={cn(
        'size-full bg-gradient-to-br from-slate-950 via-blue-900 to-slate-900 bg-[length:400%_400%]',
        className,
      )}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={transition}
      {...props}
    />
  );
}

export { GradientBackground, type GradientBackgroundProps };
