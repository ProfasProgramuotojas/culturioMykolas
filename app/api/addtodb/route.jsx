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
  
  // try {
  //   const connection = await db.getConnection();
  //   try {
  //     const query =
  //       "INSERT INTO events (eventImage, eventLocation, eventPrice, eventName, eventDate) ";
  //     const values = "VALUES (?, ?, ?, ?, ?)";
  //     const params = [
  //       event.file,
  //       event.place,
  //       event.price,
  //       event.name,
  //       event.date,
  //     ];

  //     await connection.query(query + values, params);
  //   } finally {
  //     connection.release();
  //   }
  // } catch (error) {
  //   return NextResponse.json({ error: error });
  // }
  return NextResponse.json({data: event})
}

// export async function GET(request){
//   const event = request.data
//   try {
//     const connection = await db.getConnection();
//     try {
//       const query = "SELECT * FROM uploadevent.events;";
//       return NextResponse.json({data: query})
//     }finally{
//       connection.release
//     }
//   } catch (error) {
//     return NextResponse.json({error: error})
//   }
// }
