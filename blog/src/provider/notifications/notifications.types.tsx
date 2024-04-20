export enum NotificationType {
  ERROR = "error",
  WARNING = "warning",
  SUCCESS = "success",
  INFO = "info",
}

export type Notification = {
  id: string;
  content: string;
  type: NotificationType;
};

export type NotificationState = {
  notifications: Notification[];
  removeNotification: (id: string) => void;
  actions: {
    error: (content: string) => void;
    warning: (content: string) => void;
    success: (content: string) => void;
    info: (content: string) => void;
  };
};
