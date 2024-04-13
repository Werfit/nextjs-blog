"use client";

import { forwardRef, InputHTMLAttributes, useEffect, useState } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  onChange?: (value: string | number | readonly string[] | undefined) => void;
  delay?: number;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, defaultValue, delay = 300, ...props }, ref) => {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
      const timeoutId = setTimeout(() => onChange?.(value), delay);

      return () => clearTimeout(timeoutId);
    }, [value, delay, onChange]);

    return (
      <input
        ref={ref}
        defaultValue={defaultValue}
        {...props}
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
);

Input.displayName = "DebounceInput";

export { Input };
