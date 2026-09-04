import React, { createContext, useContext, useEffect, useRef } from "react";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const listenersRef = useRef(new Set());

  useEffect(() => {
    const wsUrl =
      import.meta.env.VITE_API_URL?.replace(/^http/, "ws") ||
      "ws://localhost:5000";

    const socket = new WebSocket(wsUrl);

    socketRef.current = socket;

    socket.onopen = () => {
      console.log("🔌 WebSocket connected successfully.");

      try {
        const storedUser = JSON.parse(localStorage.getItem("userInfo"));

        const userId = storedUser?._id || storedUser?.id;

        if (userId) {
          socket.send(
            JSON.stringify({
              type: "REGISTER_USER",
              userId: userId.toString(),
            }),
          );

          console.log("👤 WebSocket user registered:", userId);
        } else {
          console.log("ℹ️ No logged-in user found for WebSocket registration.");
        }
      } catch (error) {
        console.error("WebSocket user registration error:", error);
      }
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        console.log(
          "📩 WebSocket message received:",
          JSON.stringify(data, null, 2),
        );

        // Send message to all subscribed components
        listenersRef.current.forEach((listener) => {
          try {
            listener(data);
          } catch (error) {
            console.error("WebSocket listener error:", error);
          }
        });
      } catch (error) {
        console.error("WebSocket message parsing error:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket connection error:", error);
    };

    socket.onclose = () => {
      console.log("🔌 WebSocket connection closed.");
    };

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, []);

  const subscribe = (listener) => {
    if (typeof listener !== "function") {
      return () => {};
    }

    listenersRef.current.add(listener);

    return () => {
      listenersRef.current.delete(listener);
    };
  };

  return (
    <WebSocketContext.Provider
      value={{
        socketRef,
        subscribe,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};

export default WebSocketProvider;
