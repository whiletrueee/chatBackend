import express from "express";
import config from "./config";
import loaders from "./loaders";
import http from "http";
import { Server } from "socket.io";

async function startServer(app: express.Application) {
  await loaders(app);
}

export let useSocket: any;

const app = express();
startServer(app);
const expressServer = http.createServer(app);

const io = new Server(expressServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  useSocket = socket;
  console.log("✨✨✨✨✨✨✨✨ ~ ", socket.id, " ~ ✨✨✨✨✨✨✨✨");
});

expressServer.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
