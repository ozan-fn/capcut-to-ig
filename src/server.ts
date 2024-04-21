// Importing required modules
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from 'cors'
import path from "path";

import capcutRouter from "./routes/capcutRoutes";
import instagramRouter from "./routes/instagramRoutes";

// Creating express app and http server
const app = express();
const httpServer = createServer(app);

// Setting up socket.io
const io = new Server(httpServer, { cors: { origin: '*' } });

// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use("/api", capcutRouter);
app.use("/api", instagramRouter);

// Static files
app.use(express.static(path.join(__dirname, "../client/dist")));

// Handling all other routes
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "../client/index.html")));

// Exporting app, httpServer, and io
export { app, httpServer, io };
