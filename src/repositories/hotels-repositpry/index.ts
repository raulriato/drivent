import { prisma } from "@/config";
import { } from "@prisma/client";

async function findMany() {
  return prisma.hotel.findMany();
}

async function findOneWithRoomsById(id: number) {
  return prisma.hotel.findFirst({
    where: {
      id
    },
    include: {
      Rooms: true
    }
  });
}

const hotelsRepository = {
  findMany,
  findOneWithRoomsById
};

export default hotelsRepository;
