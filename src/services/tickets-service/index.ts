import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import { Ticket, TicketType } from "@prisma/client";

async function getTicketTypes() {
  const ticketTypes = await ticketsRepository.findMany();

  if (!ticketTypes) throw notFoundError();

  return ticketTypes;
}

async function getOneByEnrollmentId(enrollmentId: number): Promise<Ticket & {
    TicketType: TicketType
}> {
  const ticket = await ticketsRepository.findByEnrollmentId(enrollmentId);

  if (!ticket) throw notFoundError();

  return ticket;
}

const ticketsService = {
  getTicketTypes,
  getOneByEnrollmentId
};

export default ticketsService;
