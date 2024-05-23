import React from 'react'
import BlogForm from '../forms/BlogForm';
import { getBlogById } from '@/functions/blogs';

export default async function EditBlogFormContent({blogId}: {blogId: string}) {
    
    const blog = await getBlogById(blogId);

    return (
        <>
            <BlogForm blog={JSON.parse(JSON.stringify(blog?.data))} />
        </>
    );
}
