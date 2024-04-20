"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { NotificationsProvider } from "./notifications/notifications.context";

type ProvidersProps = {
  session: Session | null;
  children?: React.ReactNode;
};

const Providers: React.FC<ProvidersProps> = ({ session, children }) => {
  return (
    <NotificationsProvider>
      <SessionProvider session={session}>{children}</SessionProvider>
    </NotificationsProvider>
  );
};

export { Providers };
