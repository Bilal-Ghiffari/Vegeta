import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.log("payload", payload);
    const data: Prisma.UserCreateInput = {
      email: payload.email,
      password: bcrypt.hashSync(payload.password, 8),
      name: payload.name,
    };

    const user = await prisma.user.create({
      data,
    });

    const dataRes: Partial<User> = {
      ...user,
      password: undefined,
    };

    console.log("dataRes", dataRes);

    return Response({
      message: "User registered successfully",
      data: dataRes,
    });
  } catch (error) {
    return Response({
      message: "User registered failed",
      data: error,
      status: 500,
    });
  }
}
