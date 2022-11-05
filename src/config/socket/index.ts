import http from "http";
import { Server } from "socket.io";
import session from "express-session";
import passport from "../passport";
import { getUserDonations, updateDonation } from "../../controllers/donation";
import { decodeJwt } from "../../helpers/jwt";
import { DonationModel } from "../../models/donation";

export const initSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  const wrapMiddlewareForSocketIo =
    (middleware: any) => (socket: any, next: any) =>
      middleware(socket.request, {}, next);
  io.use(wrapMiddlewareForSocketIo(passport.initialize()));
  io.use(wrapMiddlewareForSocketIo(session({ secret: "SECRET" })));
  io.use(wrapMiddlewareForSocketIo(passport.authenticate(["jwt"])));

  io.on("connection", async (socket) => {
    const token = socket.handshake.headers
      .authorization!.toString()
      .split(" ")[1];
    const tokenData = decodeJwt(token);

    socket.join(`user_${tokenData.user.id}`);

    socket.on("donations:skip", ({ id }) => {
      updateDonation(id, { shown: true });
    });

    socket.on("donations:timer:update", async ({ id, time }) => {
      io.to(`user_${tokenData.user.id}`).emit("donations:timer:updated", {
        data: {
          id,
          time,
        },
      });

      if (time === 0) updateDonation(id, { shown: true });
    });

    socket.on("donations:get", async () => {
      socket.emit("donations:set", {
        data: await getUserDonations(tokenData.user.id),
      });
    });
  });

  DonationModel.afterCreate((donation) => {
    io.to(`user_${donation.userId}`).emit("donations:updated", {
      data: donation,
    });
  });

  DonationModel.afterUpdate((donation) => {
    io.to(`user_${donation.userId}`).emit("donations:updated", {
      data: donation,
    });
  });
};
