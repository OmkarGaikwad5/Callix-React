import express from "express";
import { createServer } from "node:http";
import { connectToSocket } from "./src/controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./src/routes/user.routes.js";
import connectDB from "./db.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
connectDB();
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on Port ${PORT}`);
});
