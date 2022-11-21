import { getTicketByUser, getTicketTypes } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken);
ticketsRouter.get("/types", getTicketTypes);
ticketsRouter.get("/", getTicketByUser);

export { ticketsRouter };
