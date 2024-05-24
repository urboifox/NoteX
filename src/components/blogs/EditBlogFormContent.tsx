import React from 'react'
import BlogForm from '../forms/BlogForm';
import { getBlogBySlug } from '@/functions/blogs';

export default async function EditBlogFormContent({slug}: {slug: string}) {
    
    const blog = await getBlogBySlug(slug);

    return (
        <>
            <BlogForm blog={JSON.parse(JSON.stringify(blog?.data))} />
        </>
    );
}
