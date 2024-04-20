"use client";

import { motion } from "framer-motion";
import { useContext, useEffect } from "react";

import { ANIMATION_CONFIG } from "@/constants/animation.constants";
import { NotificationsContext } from "@/provider/notifications/notifications.context";
import {
  Notification,
  NotificationType,
} from "@/provider/notifications/notifications.types";

import { ErrorIcon } from "./icons/error-icon.component";
import { InfoIcon } from "./icons/info-icon.component";
import { SuccessIcon } from "./icons/success-icon.component";
import { WarningIcon } from "./icons/warning-icon.component";

type AlertProps = {
  notification: Notification;
};

const NotificationIcons = {
  [NotificationType.ERROR]: <ErrorIcon />,
  [NotificationType.WARNING]: <WarningIcon />,
  [NotificationType.SUCCESS]: <SuccessIcon />,
  [NotificationType.INFO]: <InfoIcon />,
};

const NotificationBanner: React.FC<AlertProps> = ({ notification }) => {
  const { removeNotification } = useContext(NotificationsContext);

  useEffect(() => {
    // const timeout = setTimeout(() => {
    //   removeNotification(notification.id);
    // }, 3000);
    // return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      className="flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
      role="alert"
      initial={{
        translateX: "200%",
        opacity: 0,
      }}
      animate={{
        translateX: "0%",
        // right: "0%",
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={ANIMATION_CONFIG}
    >
      {NotificationIcons[notification.type]}
      <div className="ms-3 min-w-40 text-sm font-normal">
        {notification.content}
      </div>
      <button
        type="button"
        className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
        aria-label="Close"
      >
        <span
          className="sr-only"
          onClick={() => removeNotification(notification.id)}
        >
          Close
        </span>
        <svg
          className="h-3 w-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
          onClick={() => removeNotification(notification.id)}
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </motion.div>
  );
};

export { NotificationBanner };
