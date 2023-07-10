import db from "./db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const connection = await db.getConnection();

    try {
      const query = 'SELECT * FROM uploadevent.events';
      const result = await connection.query(query);

      return NextResponse.json({ data: result[0] });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, body: "Error: Something went wrong" };
  }
}
