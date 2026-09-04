import { WebSocketServer } from "ws";
let wss = null;

const userConnections = new Map();
export const initializeWebSocket = (server) => {
  wss = new WebSocketServer({
    server,
  });

  wss.on("connection", (socket) => {
    console.log("🔌 WebSocket client connected.");

    socket.send(
      JSON.stringify({
        type: "connection",
        message: "Connected to Nex-Style real-time server.",
      }),
    );

    // Register User
    socket.on("message", (message) => {
      try {
        const data = JSON.parse(message.toString());

        if (data.type === "REGISTER_USER" && data.userId) {
          const userId = data.userId.toString();

          socket.userId = userId;

          if (!userConnections.has(userId)) {
            userConnections.set(userId, new Set());
          }

          userConnections.get(userId).add(socket);

          console.log(`👤 WebSocket registered for user: ${userId}`);
        }
      } catch (error) {
        console.error("WebSocket message parsing error:", error);
      }
    });

    socket.on("close", () => {
      console.log("🔌 WebSocket client disconnected.");

      if (socket.userId) {
        const connections = userConnections.get(socket.userId);

        if (connections) {
          connections.delete(socket);

          if (connections.size === 0) {
            userConnections.delete(socket.userId);
          }
        }

        console.log(`👤 WebSocket unregistered for user: ${socket.userId}`);
      }
    });

    // SOCKET ERROR
    socket.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });

  return wss;
};

// SEND MESSAGE TO ONE USER
export const sendToUser = (userId, data) => {
  if (!wss) {
    console.log("⚠️ WebSocket server is not initialized.");
    return;
  }

  if (!userId) {
    console.log("⚠️ No userId provided for WebSocket message.");
    return;
  }

  const userIdString = userId.toString();

  const connections = userConnections.get(userIdString);

  if (!connections || connections.size === 0) {
    console.log(`ℹ️ No active WebSocket connection for user: ${userIdString}`);
    return;
  }

  const message = JSON.stringify(data);

  connections.forEach((client) => {
    if (client.readyState === 1) {
      client.send(message);
    }
  });

  console.log(`📩 WebSocket message sent to user: ${userIdString}`);
};

export const broadcastWebSocket = (data) => {
  if (!wss) {
    console.log("⚠️ WebSocket server is not initialized.");
    return;
  }

  const message = JSON.stringify(data);

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(message);
    }
  });
};
