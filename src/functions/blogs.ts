import dbConnect from "@/config/db";
import { PER_PAGE } from "@/constants";
import Blog from "@/models/blogModel";
import { cookies } from "next/headers";
import * as jose from "jose";

export async function getBlogs(page: number = 1, limit: number = PER_PAGE, query: string = "") {
    await dbConnect();

    const session = cookies().get('session')?.value;
    
    if (!session) {
        return { data: [], count: 0, status: 401 };
    }

    const validSession = jose.jwtVerify(session, new TextEncoder().encode(process.env.JWT_SECRET!));
    
    if (!validSession) {
        return {
            data: [],
            count: 0,
            status: 401
        };
    }

    const decoded = jose.decodeJwt(session);
    const userId = decoded.id;

    const regex = new RegExp(`(${query})`, 'gi');

    const blogs = await Blog.find({ title: { $regex: regex }, creatorId: userId }).limit(limit).skip(limit * (page - 1));
    const count = await Blog.countDocuments({ creatorId: userId });

    return { data: blogs, count, status: 200 };
}

export async function getBlogById(blogId: string): Promise<DataResponse<BlogResponse | null> | null> {
    await dbConnect();

    const blog = await Blog.findById(blogId);
    const session = cookies().get('session')?.value;

    if (!blog) {
        return { data: null, status: 404, count: 0 };
    }

    if (!session) {
        if (!blog.published) {
            return { data: null, status: 401, count: 0 };
        }

        return blog;
    } else {
        const decoded = jose.decodeJwt(session);
        const userId = decoded.id;

        if (!blog.published && blog.creatorId.toString() !== userId) {
            return { data: null, status: 401, count: 0 };
        }

        return { data: blog, status: 200, count: 0 };
    }
}

export async function addView(blogId: string) {
    await dbConnect();

    const session = cookies().get('session')?.value;

    if (!session) {
        return;
    }

    const decoded = jose.decodeJwt(session);
    const userId = decoded.id;

    if (!userId) {
        return;
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
        return;
    }

    if (blog.viewsIds.includes(userId.toString())) {
        return;
    }

    blog.viewsCount += 1;
    blog.viewsIds.push(userId);

    await blog.save();
}