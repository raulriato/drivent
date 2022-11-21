import { getTicketByUser, getTicketTypes, postTicket } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { ticketTypeSchema } from "@/schemas";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken)
  .get("/types", getTicketTypes)
  .get("/", getTicketByUser)
  .post("/", validateBody(ticketTypeSchema), postTicket);

export { ticketsRouter };
