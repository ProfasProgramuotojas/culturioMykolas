import db from "../db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const newEvent = await request.json();
  try {
    const connection = await db.getConnection();

    try {
      const query =
      'UPDATE events SET eventName = ?, eventDate = ?, eventLocation = ?, eventPrice = ?, eventImage = ?, userId = ? WHERE id = ?';
      const params = [
        newEvent.eventName,
        newEvent.eventDate,
        newEvent.eventLocation,
        newEvent.eventPrice,
        newEvent.eventImage,
        newEvent.userId,
        newEvent.id
      ];
      await connection.query(query, params);

      return NextResponse.json({ data: 'success' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, body: "error, something went wrong" };
  }
}
