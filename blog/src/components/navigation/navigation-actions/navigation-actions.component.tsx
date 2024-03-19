"use client";

import { useSession } from "next-auth/react";

type NavigationActionsProps = {
  authenticatedChildren: React.ReactNode;
  publicChildren: React.ReactNode;
};

const NavigationActions: React.FC<NavigationActionsProps> = ({
  authenticatedChildren,
  publicChildren,
}) => {
  const session = useSession();

  if (session.status === "loading") {
    return <div></div>;
  }

  if (session.status === "authenticated") {
    return authenticatedChildren;
  }

  return publicChildren;
};

export { NavigationActions };
