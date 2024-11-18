const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" folder
app.use(express.static("public"));

// Socket.IO events
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle typing events
  socket.on("typing", () => {
    socket.broadcast.emit("typing");
  });

  socket.on("stop typing", () => {
    socket.broadcast.emit("stop typing");
  });

  // Handle chat messages
  socket.on("chat message", (data) => {
    io.emit("chat message", data);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
