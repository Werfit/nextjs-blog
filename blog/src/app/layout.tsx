import type { Metadata } from "next";
import { Asap } from "next/font/google";
import { SessionProvider } from "@/components/auth/session-provider.component";
import { getServerSession } from "next-auth";

import "@/assets/styles/globals.css";
import "@/assets/styles/icons.css";

const asap = Asap({
  subsets: ["latin"],
  variable: "--font-asap",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog application with SEO optimization",
};

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={asap.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
        <div id="modal"></div>
        <div id="mobile-menu"></div>
        <div id="overlays"></div>
        <div id="loader"></div>
      </body>
    </html>
  );
};

export default Layout;
