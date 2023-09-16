"use server";

import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const DOMAIN = process.env.DOMAIN || "localhost:3000";
const PROTOCOL = process.env.NODE_ENV === "production" ? "https" : "http";

const prisma = new PrismaClient();

export async function resetPassword(data: FormData) {
  const email = data.get("email");
  if (!email || typeof email !== "string") {
    return {
      error: "Invalid Email",
    };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      error: "This Email Not Registered",
    };
  }

  const resetToken = await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
    },
  });

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: user.email,
    subject: "Reset Password",
    text: `Hello ${user.name}, someone requested reset password. If you did not request this reset, please ignore this. This link only valid for 4 hours
      Please click here: ${PROTOCOL}://${DOMAIN}/password-reset/${resetToken.token}`,
  });

  redirect("/forgot-password/success");
}
