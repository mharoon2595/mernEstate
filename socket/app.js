import { Server } from "socket.io";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/stayActive", (req, res, next) => {
  res.status(200).json({ message: "Hello world" });
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "https://mernestate.vercel.app",
  },
});

let onlineUsers = [];

const addUser = (userId, socketId) => {
  const userExists = onlineUsers.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUsers.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log("online users--->", onlineUsers);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    console.log(receiver);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("online users--->", onlineUsers);
  });
});
