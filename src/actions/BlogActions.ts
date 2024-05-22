'use server';

import dbConnect from "@/config/db";
import Blog from "@/models/blogModel";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as zod from 'zod';
import * as jose from "jose";
import { revalidatePath } from "next/cache";

const createBlogSchema = zod.object({
    brief: zod.string().min(3, "Brief must be at least 10 characters").max(100, "Brief must be at most 100 characters"),
})


type BlogFormType = {
    success: boolean;
    errors?: {
        brief?: string[],
    }
}

export async function createBlog(data: BlogFormType, formData: FormData): Promise<BlogFormType> {
    await dbConnect();

    const brief = formData.get('brief');
    const content = formData.get('content');
    const session = cookies().get('session')?.value;

    if (!session) {
        redirect('/login');
    }

    const result = createBlogSchema.safeParse({ brief, content });

    if (result.success) {
        const decoded = jose.decodeJwt(session);
        const userId = decoded.id;

        const blog = new Blog({ brief, content, creatorId: userId });
        await blog.save();

        revalidatePath('/blog');

        return { success: true }
    } else {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors
        }
    }
}

export async function updateBlog(data: BlogFormType, formData: FormData): Promise<BlogFormType> {
    await dbConnect();

    const brief = formData.get("brief");
    const content = formData.get("content");
    const blogId = formData.get("blogId");
    const session = cookies().get("session")?.value;

    if (!session) {
        redirect("/login");
    }

    const result = createBlogSchema.safeParse({ brief, content });

    if (result.success) {

        const blog = await Blog.findById(blogId);

        if (!blog) {
            redirect("/blog");
        }

        blog.brief = brief;
        blog.content = content;

        await blog.save();

        revalidatePath(`/blog/${blogId}`);

        return { success: true };
    }

    return {
        success: false,
        errors: result.error.flatten().fieldErrors,
    };
}