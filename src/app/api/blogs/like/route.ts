import dbConnect from "@/config/db";
import Blog from "@/models/blogModel";
import { decodeJwt } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const blogId = searchParams.get("blogId");

    if (!blogId) {
        return NextResponse.json({ data: null }, { status: 400 });
    }

    const session = req.cookies.get("session")?.value;

    if (!session) {
        return NextResponse.json({ data: null }, { status: 401 });
    }

    await dbConnect();

    const blog = await Blog.findById(blogId);

    if (!blog) {
        return NextResponse.json({ data: null }, { status: 404 });
    }

    const decoded = decodeJwt(session);
    const userId = decoded?.id;

    if (!userId) {
        return NextResponse.json({ data: null }, { status: 401 });
    }

    if (blog.likesIds.includes(userId.toString())) {
        blog.likesCount -= 1;
        blog.likesIds = blog.likesIds.filter((likeId: string) => likeId.toString() !== userId.toString());
    } else {
        blog.likesCount += 1;
        blog.likesIds.push(userId);
    }

    await blog.save();

    return NextResponse.json({ data: null }, { status: 200 });
}