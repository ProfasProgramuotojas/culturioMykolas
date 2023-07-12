import { NextResponse } from "next/server";
import db from "../db";

export async function POST(request) {
  const username = await request.json();
  try {
    const connection = await db.getConnection();

    try {
      const query = `SELECT userId, username
      FROM users
      WHERE username = '${username.username}'`;
      const usernameId = await connection.query(query);

      return NextResponse.json({ data: usernameId[0][0] });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.log("Error:", error);
    return { status: 500, body: "error, something went wrong" };
  }
}
