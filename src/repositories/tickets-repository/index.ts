import { prisma } from "@/config";
import { TicketType } from "@prisma/client";

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

const ticketsRepository = {
  findMany,
  findByEnrollmentId
};

type GetTicketTypesResult = Omit<TicketType, "createdAt" | "updatedAt">;

export default ticketsRepository;
