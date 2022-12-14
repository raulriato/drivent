import { prisma } from "@/config";
import { } from "@prisma/client";

async function findMany() {
  return prisma.hotel.findMany();
}

async function findOneWithRoomsById(id: number) {
  console.log("fez a requisição");
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
