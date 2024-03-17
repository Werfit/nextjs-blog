"use client";

import { useEffect } from "react";
import {
  usePresence,
  useAnimate,
  ValueAnimationTransition,
  AnimationPlaybackControls,
  AnimationScope,
} from "framer-motion";

type AnimateFn = (
  from: unknown,
  to: unknown,
  config?: ValueAnimationTransition,
) => AnimationPlaybackControls;

type UseAnimationOnInitAndCleanupProps = {
  onEnter: (scope: AnimationScope, animate: AnimateFn) => void | Promise<void>;
  onExit: (scope: AnimationScope, animate: AnimateFn) => void | Promise<void>;
};

export const useAnimationOnInitAndCleanup = <T extends Element>({
  onEnter,
  onExit,
}: UseAnimationOnInitAndCleanupProps) => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate<T>();

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        await onEnter(scope, animate);
      };
      enterAnimation();
    } else {
      const exitAnimation = async () => {
        await onExit(scope, animate);
        safeToRemove();
      };

      exitAnimation();
    }
  }, [isPresent]);

  return { scope };
};
