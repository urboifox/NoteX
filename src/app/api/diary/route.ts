import dbConnect from "@/config/db";

export async function GET() {
    dbConnect();
    return new Response("Hello World");
}