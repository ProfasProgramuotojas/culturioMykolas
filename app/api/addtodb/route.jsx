import db from "../db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const event = await request.json();
  try {
    const connection = await db.getConnection();
  
    try {
      const query = "INSERT INTO events (eventName, eventDate, eventLocation, eventPrice, eventImage) VALUES (?, ?, ?, ?, ?)";
      const params = [event.name, event.date, event.place, event.price, event.file];
      await connection.query(query, params);
  
      return NextResponse.json({ success: true });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, body: "error, something went wrong" };
  }
}