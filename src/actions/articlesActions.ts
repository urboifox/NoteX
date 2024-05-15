'use server';

import dbConnect from "@/config/db";
import Article from "@/models/articleModel";

export async function createArticle(formData: FormData) {
    dbConnect();

    const title = formData.get('title');
    const description = formData.get('description');
    const content = formData.get('content');

    const article = new Article({ title, description, content });

    await article.save().then(() => {
        return {success: true, message: 'Article created successfully'}
    }).catch((error: any) => {
        return {success: false, message: 'Article creation failed'}
    })

    return "hi";
}

