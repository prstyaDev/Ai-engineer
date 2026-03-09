import { NextResponse } from "next/server";
import { ContactFormData } from "@/types";

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    // Validate the request body
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Note: Database integration disabled for demo
    // In production, integrate with a database or email service
    const message = {
      id: "demo-" + Date.now(),
      name: body.name,
      email: body.email,
      message: body.message,
      createdAt: new Date(),
    };

    return NextResponse.json(
      { success: true, data: message },
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
