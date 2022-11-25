import { prisma } from "@/config";
import { } from "@prisma/client";

async function findMany() {
  return prisma.hotel.findMany();
}

const hotelsRepository = {
  findMany
};

export default hotelsRepository;
