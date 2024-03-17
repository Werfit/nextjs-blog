export const combineClassNames = (
  ...classNames: (string | undefined)[]
): string => classNames.filter(Boolean).join(" ");
