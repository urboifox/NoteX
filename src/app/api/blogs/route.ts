import dbConnect from "@/config/db";
import Blog from "@/models/blogModel";
import { decodeJwt, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const blogId = req.nextUrl.searchParams.get("blogId");
    const authHeader = req.headers.get('Authorization');
    const session = authHeader?.split(' ')[1];

    if (!blogId || !session) {
        return NextResponse.json({ data: null, message: "Not authorized" }, { status: 401 });
    }

    const validSession = jwtVerify(session, new TextEncoder().encode(process.env.JWT_SECRET!));
    
    if (!validSession) {
        return NextResponse.json({ data: null, message: "Not authorized" }, { status: 401 });
    }

    await dbConnect();

    const blogFound = await Blog.findById(blogId);
    if (!blogFound) {
        return NextResponse.json({ data: null, message: "Session not found" }, { status: 404 });
    }

    const decoded = decodeJwt(session);
    const userId = decoded?.id;

    if (blogFound.creatorId.toString() !== userId) {
        return NextResponse.json({ data: null, message: "Not authorized" }, { status: 401 });
    }

    await Blog.findByIdAndDelete(blogId);

    return NextResponse.json({ data: null }, { status: 200 });
}

export async function PATCH(req: NextRequest) {
    const blogId = req.nextUrl.searchParams.get("blogId");
    const authHeader = req.headers.get('Authorization');
    const session = authHeader?.split(' ')[1];

    if (!blogId || !session) {
        return NextResponse.json({ data: null, message: "Not authorized" }, { status: 401 });
    }

    const validSession = jwtVerify(session, new TextEncoder().encode(process.env.JWT_SECRET!));
    
    if (!validSession) {
        return NextResponse.json({ data: null, message: "Not authorized" }, { status: 401 });
    }

    await dbConnect();

    const blogFound = await Blog.findById(blogId);
    if (!blogFound) {
        return NextResponse.json({ data: null, message: "Session not found" }, { status: 404 });
    }

    const decoded = decodeJwt(session);
    const userId = decoded?.id;

    if (blogFound.creatorId.toString() !== userId) {
        return NextResponse.json({ data: null, message: "Not authorized" }, { status: 401 });
    }

    const body = await req.json();

    await Blog.findByIdAndUpdate(blogId, body);

    return NextResponse.json({ data: null }, { status: 200 });
}