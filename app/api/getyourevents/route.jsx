import db from "../db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const userId = await request.json();
  try {
    const connection = await db.getConnection();

    try {
      const query = `SELECT * FROM events WHERE userId = '${userId.userId}'`;
      const events = await connection.query(query);

      return NextResponse.json({ data: events[0] });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, body: "error, something went wrong" };
  }
}
