import type { Session } from "next-auth";

/**
 * Helper for Prisma. Simple method for returning the object I need if user is authenticated, and returns empty object (to avoid redundant conditions) if user is not authenticated
 */
export const getAuthDependentCondition = <T>(
  isAuthenticatedResult: T,
  session: Session | null,
): T | Record<string, never> => {
  if (!session) {
    return {};
  }

  return isAuthenticatedResult;
};
