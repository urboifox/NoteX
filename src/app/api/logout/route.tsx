import { cookies } from "next/headers";

export async function GET() {
    cookies().delete("session");
    return Response.json({ success: true }, { status: 200 });
}