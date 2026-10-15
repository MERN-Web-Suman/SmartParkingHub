import { Server } from "socket.io";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Websocket client connected: ${socket.id}`);

    // Join parking area room for live slot status updates
    socket.on("joinParkingArea", (areaId) => {
      socket.join(`area_${areaId}`);
      console.log(`Socket ${socket.id} joined room area_${areaId}`);
    });

    // Simulate real-time occupancy updates
    socket.on("simulateSlotUpdate", (data) => {
      io.to(`area_${data.areaId}`).emit("slotStatusChanged", data);
    });

    socket.on("disconnect", () => {
      console.log(`Websocket client disconnected: ${socket.id}`);
    });
  });

  return io;
};
