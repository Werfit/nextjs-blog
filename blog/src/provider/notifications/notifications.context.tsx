"use client";

import { createContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import {
  Notification,
  NotificationState,
  NotificationType,
} from "./notifications.types";

const NOTIFICATION_DURATION = 3000;

const initialState: NotificationState = {
  notifications: [],
  removeNotification: () => {},
  actions: {
    error: () => {},
    warning: () => {},
    success: () => {},
    info: () => {},
  },
};

const NotificationsContext = createContext(initialState);

const NotificationsProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [timeoutsIds, setTimeoutsIds] = useState<NodeJS.Timeout[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    return () => {
      timeoutsIds.map((timeoutId) => clearTimeout(timeoutId));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeNotification = (id: string) =>
    setNotifications((state) =>
      state.filter((notification) => notification.id !== id),
    );

  const error = (content: string) => {
    const id = uuid();
    setNotifications((notifications) => [
      ...notifications,
      { id, content, type: NotificationType.ERROR },
    ]);

    const timeoutId = setTimeout(
      () => removeNotification(id),
      NOTIFICATION_DURATION,
    );
    setTimeoutsIds((state) => [...state, timeoutId]);
  };

  const warning = (content: string) => {
    const id = uuid();
    setNotifications((notifications) => [
      ...notifications,
      { id, content, type: NotificationType.WARNING },
    ]);

    const timeoutId = setTimeout(
      () => removeNotification(id),
      NOTIFICATION_DURATION,
    );
    setTimeoutsIds((state) => [...state, timeoutId]);
  };

  const success = (content: string) => {
    const id = uuid();

    setNotifications((notifications) => [
      ...notifications,
      { id, content, type: NotificationType.SUCCESS },
    ]);

    const timeoutId = setTimeout(
      () => removeNotification(id),
      NOTIFICATION_DURATION,
    );
    setTimeoutsIds((state) => [...state, timeoutId]);
  };

  const info = (content: string) => {
    const id = uuid();
    setNotifications((notifications) => [
      ...notifications,
      { id, content, type: NotificationType.INFO },
    ]);

    const timeoutId = setTimeout(
      () => removeNotification(id),
      NOTIFICATION_DURATION,
    );
    setTimeoutsIds((state) => [...state, timeoutId]);
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        removeNotification,
        actions: {
          error,
          warning,
          success,
          info,
        },
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export { NotificationsContext, NotificationsProvider };
