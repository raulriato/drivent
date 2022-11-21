import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import { Ticket, TicketStatus, TicketType } from "@prisma/client";
import enrollmentsService from "../enrollments-service";

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

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError;

  const data = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED
  };

  const newTicket = ticketsRepository.create(data);

  return newTicket;
}

const ticketsService = {
  getTicketTypes,
  getOneByEnrollmentId,
  createTicket
};

export default ticketsService;
