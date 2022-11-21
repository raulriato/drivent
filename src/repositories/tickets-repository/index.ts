import { prisma } from "@/config";
import { Ticket, TicketStatus, TicketType } from "@prisma/client";

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

async function findById(id: number) {
  return prisma.ticket.findFirst({
    where: {
      id
    }
  });
}

async function update(id: number) {
  return prisma.ticket.update({
    where: {
      id
    },
    data: {
      status: TicketStatus.PAID
    }
  });
}

const ticketsRepository = {
  findMany,
  findByEnrollmentId,
  create,
  findById,
  update
};

type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">
type GetTicketTypesResult = Omit<TicketType, "createdAt" | "updatedAt">;

export default ticketsRepository;
