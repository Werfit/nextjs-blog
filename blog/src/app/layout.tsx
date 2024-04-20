import "@/assets/styles/globals.css";
import "@/assets/styles/icons.css";

import type { Metadata } from "next";
import { Asap } from "next/font/google";
import { getServerSession } from "next-auth";

import { NotificationContainer } from "@/components/notification-container/notification-container.component";
import { Providers } from "@/provider/providers";
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
        <Providers session={session}>
          {children}
          <NotificationContainer />
        </Providers>
        <div id="modal"></div>
        <div id="mobile-menu"></div>
        <div id="overlays"></div>
        <div id="loader"></div>
      </body>
    </html>
  );
};

export default Layout;
