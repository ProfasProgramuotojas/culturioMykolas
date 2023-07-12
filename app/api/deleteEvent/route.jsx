import db from "../db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const id = await request.json();
  try {
    const connection = await db.getConnection();

    try {
      const query = "DELETE FROM events WHERE id = ?";
      const params = [id.id];
      await connection.query(query, params);

      return NextResponse.json({ data: "success" });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, body: "error, something went wrong" };
  }
}
