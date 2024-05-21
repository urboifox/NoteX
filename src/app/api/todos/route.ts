import Todo from "@/models/TodoModel";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams;
    const todoId = searchParams.get("todoId");

    if (!todoId) {
        return NextResponse.json({ data: null }, { status: 400 });
    }

    await Todo.findByIdAndDelete(todoId);

    return NextResponse.json({ data: null }, { status: 200 });
}

export async function PATCH(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams;
    const todoId = searchParams.get("todoId");

    if (!todoId) {
        return NextResponse.json({ data: null }, { status: 400 });
    }

    const data = await req.json();

    await Todo.findByIdAndUpdate(todoId, data);

    return NextResponse.json({ data: null }, { status: 200 });
}