import { prisma } from "@/config";
import { Ticket, TicketType } from "@prisma/client";

async function findMany(): Promise<GetTicketTypesResult[]> {
  return prisma.ticketType.findMany();
}

async function findByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId
    },
    include: {
      TicketType: true
    }
  });
}

async function create(data: CreateTicketParams) {
  return prisma.ticket.create({
    data,
    include: {
      TicketType: true
    }
  });
}

const ticketsRepository = {
  findMany,
  findByEnrollmentId,
  create
};

type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">
type GetTicketTypesResult = Omit<TicketType, "createdAt" | "updatedAt">;

export default ticketsRepository;
