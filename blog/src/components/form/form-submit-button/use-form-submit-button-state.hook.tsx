"use client";

import { useEffect, useState } from "react";

type FormState = {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
};

type UseFormSubmitButtonState = () => {
  formState: FormState;
  startLoading: () => void;
  finishLoading: (newState: Omit<FormState, "isLoading">) => void;
  reset: () => void;
};

const useFormSubmitButtonState: UseFormSubmitButtonState = () => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    isSuccess: false,
    error: null,
  });

  useEffect(() => {
    if (timeoutId) {
      return () => clearTimeout(timeoutId);
    }
  }, [timeoutId]);

  const startLoading = () =>
    setFormState({ isSuccess: false, isLoading: true, error: null });

  const finishLoading = (newState: Omit<FormState, "isLoading">) =>
    setFormState({ isLoading: false, ...newState });

  const reset = (interval: number = 3000) => {
    const timeoutId = setTimeout(
      () => setFormState({ isLoading: false, isSuccess: false, error: null }),
      interval,
    );
    setTimeoutId(timeoutId);
  };

  return { formState, startLoading, finishLoading, reset };
};

export { useFormSubmitButtonState };
