"use client";

import {
  AnimationPlaybackControls,
  AnimationScope,
  useAnimate,
  usePresence,
  ValueAnimationTransition,
} from "framer-motion";
import { useEffect } from "react";

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
