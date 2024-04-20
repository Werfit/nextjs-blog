"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useNotificationsContext } from "@/provider/notifications/notifications.hook";

import { NotificationBanner } from "./notification-banner.component";

const NotificationContainer = () => {
  const { notifications } = useNotificationsContext();
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = document.getElementById("notifications");

    if (!element) {
      const container = document.createElement("div");
      container.setAttribute("id", "notifications");

      document.body.appendChild(container);
      setElement(container);
      return;
    }

    setElement(element);
  }, []);

  return (
    element &&
    createPortal(
      <div className="fixed right-10 top-6 flex flex-col justify-end gap-4">
        <AnimatePresence>
          {notifications.map((notification) => (
            <NotificationBanner
              key={notification.id}
              notification={notification}
            />
          ))}
        </AnimatePresence>
      </div>,
      element,
    )
  );
};

export { NotificationContainer };
