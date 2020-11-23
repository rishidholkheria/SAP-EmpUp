const http = require("http");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("../utils/userChat");

const ioEvents = (io) => {
  io.on("connect", (socket) => {
    socket.on("join", ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });

      if (error) return callback(error);

      socket.join(user.room);

      socket.emit("message", {
        user: "admin",
        text: `${user.name}, welcome to room ${user.room}.`,
      });
      socket.broadcast
        .to(user.room)
        .emit("message", { user: "admin", text: `${user.name} has joined!` });

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });

      callback();
    });

    socket.on("sendMessage", (message, callback) => {
      const user = getUser(socket.id);

      io.to(user.room).emit("message", { user: user.name, text: message });

      callback();
    });

    socket.on("disconnect", () => {
      const user = removeUser(socket.id);

      if (user) {
        io.to(user.room).emit("message", {
          user: "Admin",
          text: `${user.name} has left.`,
        });
        io.to(user.room).emit("roomData", {
          room: user.room,
          users: getUsersInRoom(user.room),
        });
      }
    });
  });
};

var init = function (app) {
  const server = http.Server(app);
  var io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  ioEvents(io);
  return server;
};

module.exports = init;
