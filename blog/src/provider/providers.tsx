"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type ProvidersProps = {
  session: Session | null;
  children?: React.ReactNode;
};

const Providers: React.FC<ProvidersProps> = ({ session, children }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export { Providers };
