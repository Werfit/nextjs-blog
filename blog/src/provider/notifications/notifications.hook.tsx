"use client";

import { useContext } from "react";

import { NotificationsContext } from "./notifications.context";

export const useNotificationsContext = () => useContext(NotificationsContext);
