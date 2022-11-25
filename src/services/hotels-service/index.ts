import { unauthorizedError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repositpry";
import { Ticket, TicketType } from "@prisma/client";
import enrollmentsService from "../enrollments-service";
import ticketsService from "../tickets-service";

async function getHotels(userId: number) {
  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
  const ticket = await ticketsService.getOneByEnrollmentId(enrollment.id);

  if (!isValidTicket(ticket)) {
    throw unauthorizedError();
  }

  return await hotelsRepository.findMany();
}

function isValidTicket(ticket: Ticket & {
    TicketType: TicketType;
}) {
  return ticket.status === "PAID" && ticket.TicketType.includesHotel;
}

const hotelsService = {
  getHotels
};

export default hotelsService;
