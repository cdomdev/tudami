import { NextRequest, NextResponse } from "next/server";
import {createNotification} from "../helpers/notifications"

export async function POST(request: NextRequest) {
  try {
    const {
      user_id,
      actor_id,
      type,
      entity_id,
      entity_type,
      content,
      url,
      read,
    } = await request.json();

    if (!user_id || !content) {
      return NextResponse.json(
        { error: "user_id and message are required" },
        { status: 400 }
      );
    }

    const payloadData = {
      user_id,
      actor_id,
      type,
      entity_id,
      entity_type,
      content,
      url,
      read,
    };


    const data = await createNotification(payloadData);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
