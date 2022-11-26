import { unauthorizedError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repositpry";
import { Ticket, TicketStatus, TicketType } from "@prisma/client";
import enrollmentsService from "../enrollments-service";
import ticketsService from "../tickets-service";

async function checkCredentials(userId: number) {
  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
  const ticket = await ticketsService.getOneByEnrollmentId(enrollment.id);

  if (!isValidTicket(ticket)) {
    throw unauthorizedError();
  }
}

async function getHotels(userId: number) {
  await checkCredentials(userId);

  return await hotelsRepository.findMany();
}

function isValidTicket(ticket: Ticket & {
    TicketType: TicketType;
}) {
  return ticket.status === TicketStatus.PAID && ticket.TicketType.includesHotel;
}

async function getOneById(hotelId: number, userId: number) {
  await checkCredentials(userId);

  return hotelsRepository.findOneWithRoomsById(hotelId);
}

const hotelsService = {
  getHotels,
  getOneById
};

export default hotelsService;
