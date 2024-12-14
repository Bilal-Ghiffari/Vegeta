import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    // match password
    if (!user || !bcrypt.compareSync(payload.passwowrd, user.password)) {
      return Response({
        message: "Incorrect email or password",
        status: 404,
      });
    }

    // hide password
    const data: Partial<User> = {
      ...user,
      password: undefined,
    };

    // response success
    return Response({
      message: "Sign in successfully",
      status: 200,
      data,
    });
  } catch (error: any) {
    // response error
    return Response({
      message: "Sign in failed",
      status: 500,
      data: error,
    });
  }
}
