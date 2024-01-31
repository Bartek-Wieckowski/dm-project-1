import { createContext, useContext, useState } from "react";
import Notification from "../components/Notification";

export type NotificationType = "success" | "error" | "info";

type NotificationContextValues = {
  showNotification: (message: string, type: NotificationType) => void;
  hideNotification: (notificationId: number) => void;
};

const NotificationContext = createContext<NotificationContextValues | null>(null);

function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<
    { id: number; message: string; type: NotificationType }[]
  >([]);

  function showNotification(message: string, type: NotificationType) {
    const newNotification = { id: Date.now(), message, type };
    setNotifications([...notifications, newNotification]);

    setTimeout(() => {
      hideNotification(newNotification.id);
    }, 3000);
  }
  function hideNotification(notificationId: number) {
    setNotifications((prevNotif) => prevNotif.filter((item) => item.id !== notificationId));
  }

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      <div className="fixed top-3 left-1/2 transform -translate-x-1/2 w-full min-w-[320px] max-w-[420px]">
        {notifications.map((notification, index) => (
          <Notification
            key={index}
            message={notification.message}
            type={notification.type}
            hideNotification={() => hideNotification(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

export { NotificationProvider, useNotification };
