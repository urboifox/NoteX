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

    const decoded = jose.decodeJwt(session);
    const userId = decoded.id;

    const regex = new RegExp(`(${query})`, 'gi');

    const blogs = await Blog.find({ brief: { $regex: regex }, creatorId: userId }).limit(limit).skip(limit * (page - 1));
    const count = await Blog.countDocuments({ creatorId: userId });

    return { data: blogs, count, status: 200 };
}

export async function getBlogById(blogId: string): Promise<BlogResponse | null> {
    await dbConnect();

    const blog = await Blog.findById(blogId);

    if (!blog) {
        return null;
    }

    return blog;
}

