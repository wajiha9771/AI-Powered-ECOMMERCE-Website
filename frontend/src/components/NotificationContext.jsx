import React, { createContext, useContext, useEffect, useState } from "react";
import { useWebSocket } from "./WebSocketProvider";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const webSocketContext = useWebSocket();
  const subscribe = webSocketContext?.subscribe;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (typeof subscribe !== "function") {
      return;
    }

    const unsubscribe = subscribe((data) => {
      if (data.type !== "ORDER_STATUS_UPDATED") {
        return;
      }

      const newNotification = {
        id: `${data.orderId}-${Date.now()}`,
        type: data.type,
        orderId: data.orderId,
        status: data.status,
        message: data.message,
        read: false,
        createdAt: new Date().toISOString(),
      };

      setNotifications((prev) => [newNotification, ...prev]);
    });

    return unsubscribe;
  }, [subscribe]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const markAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              read: true,
            }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(NotificationContext);
};

export default NotificationProvider;
