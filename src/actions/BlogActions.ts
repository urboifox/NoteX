'use server';

import dbConnect from "@/config/db";
import Blog from "@/models/blogModel";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as zod from 'zod';
import * as jose from "jose";
import { revalidatePath } from "next/cache";

const createBlogSchema = zod.object({
    title: zod.string().min(10, "Title must be at least 10 characters").max(100, "Brief must be at most 100 characters"),
    brief: zod.string().min(10, "Brief must be at least 10 characters").max(150, "Brief must be at most 150 characters"),
})


type BlogFormType = {
    success: boolean;
    errors?: {
        brief?: string[],
        title?: string[];
    }
}

export async function createBlog(data: BlogFormType, formData: FormData): Promise<BlogFormType> {
    await dbConnect();

    const published = formData.get('published') as string;
    const title = formData.get('title') as string;
    const brief = formData.get('brief') as string;
    const content = formData.get('content') as string;
    const tags = formData.getAll('tags[]') as string[];
    const session = cookies().get('session')?.value;

    if (!session) {
        redirect('/login');
    }

    const result = createBlogSchema.safeParse({ brief, content, title });

    if (result.success) {

        const existingBlog = await Blog.findOne({ title });

        if (existingBlog) {
            return {
                success: false,
                errors: {
                    title: ["Title already exists"],
                },
            };
        }


        const decoded = jose.decodeJwt(session);
        const userId = decoded.id;

        const blog = new Blog({
            title,
            brief,
            content,
            tags: tags || [],
            published: published === 'true',
            creatorId: userId,
            slug: title.replace(/\s+/g, "-").toLowerCase(),
        });
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

    const published = formData.get("published") as string;
    const tags = formData.getAll("tags[]") as string[];
    const title = formData.get("title") as string;
    const brief = formData.get("brief") as string;
    const content = formData.get("content") as string;
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

        const existingBlog = await Blog.findOne({ title });

        if (existingBlog && existingBlog._id.toString() !== blogId) {
            return {
                success: false,
                errors: {
                    title: ["Title already exists"],
                },
            };
        }

        blog.published = published === "true";
        blog.tags = tags || [];
        blog.title = title;
        blog.brief = brief;
        blog.content = content;
        blog.slug = title.replace(/\s+/g, '-').toLowerCase();
        blog.updatedAt = new Date();

        await blog.save();

        revalidatePath(`/blog/${blogId}`);

        return { success: true };
    }

    return {
        success: false,
        errors: result.error.flatten().fieldErrors,
    };
}