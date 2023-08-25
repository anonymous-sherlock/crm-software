import { db } from "@/lib/db";
import { userSchema } from "@/schemauserSchema";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const result = userSchema.safeParse(body);
  if (!result.success) {
    const formatted = result.error.format();
    return NextResponse.json(
      {
        errors: formatted,
      },
      {
        status: 400,
      }
    );
  }

  const existingUser = await db.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (existingUser) {
    return NextResponse.json(
      {
        errors: "User with this email already exist",
      },
      {
        status: 409,
      }
    );
  }
  try {
    const hashPassword = await hash(body.password, 12);
    const newUser = await db.user.create({
      data: { ...body, password: hashPassword },
    });
    const { password, emailVerified, ...userCreated } = newUser;

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        callback: "/login",
        user: { ...userCreated },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        errors: "Something Went Wrong",
      },
      {
        status: 500,
      }
    );
  }
}
