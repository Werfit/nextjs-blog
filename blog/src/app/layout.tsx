import "@/assets/styles/globals.css";
import "@/assets/styles/icons.css";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";
import { Asap } from "next/font/google";
import { getServerSession } from "next-auth";
import { ToastContainer } from "react-toastify";

import { SessionProvider } from "@/components/auth/session-provider.component";
import { combineClassNames } from "@/utils/class-name.util";

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
      <body
        className={combineClassNames(asap.className, "bg-gray-50 leading-6")}
      >
        <SessionProvider session={session}>{children}</SessionProvider>
        <div id="modal"></div>
        <div id="mobile-menu"></div>
        <div id="overlays"></div>
        <div id="loader"></div>
        <ToastContainer />
      </body>
    </html>
  );
};

export default Layout;
