'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  nextUrl?: string; // swipe left
  prevUrl?: string; // swipe right
}

const SWIPE_THRESHOLD = 100; // px
const VELOCITY_THRESHOLD = 500; // px/s

/** Horizontal swipe gesture that navigates to another page. */
const SwipeNavigation = ({ children, nextUrl, prevUrl }: Props) => {
  const router = useRouter();

  return (
    <motion.div
      className="relative h-full w-full flex-1 touch-pan-y"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragEnd={(_, info) => {
        const toLeft = info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -VELOCITY_THRESHOLD;
        const toRight = info.offset.x > SWIPE_THRESHOLD || info.velocity.x > VELOCITY_THRESHOLD;

        if (nextUrl && toLeft) router.push(nextUrl);
        else if (prevUrl && toRight) router.push(prevUrl);
      }}
    >
      {children}
    </motion.div>
  );
};

export default SwipeNavigation;
