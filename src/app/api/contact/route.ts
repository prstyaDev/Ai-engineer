import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, message } = body;

    // Validate the request body
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Save to MongoDB using Prisma
    const savedMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json(
      { success: true, data: savedMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
}
