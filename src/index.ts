import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import http from "http";
import bodyParser from "body-parser";
import database from "./config/sequelize/database";
import { initDatabase } from "./config/sequelize";
import { authRouter } from "./routes/auth";

import "./models/associations";
import { donationsRouter } from "./routes/donations";
import { initSocket } from "./config/socket";

dotenv.config();

const port = process.env.PORT;

const app: Express = express();
const server = http.createServer(app);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

initDatabase(database);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/donations", donationsRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ success: false });
});

initSocket(server)

server.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
