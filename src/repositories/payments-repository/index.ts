import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function findByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId
    }
  });
}

async function create(data: CreatePaymentParams) {
  return prisma.payment.create({
    data
  });
}

const paymentsRepository = {
  findByTicketId,
  create
};

export type CreatePaymentParams = Omit<Payment, "id" | "createdAt" | "updatedAt">;

export default paymentsRepository;
