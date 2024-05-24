import dbConnect from "@/config/db";
import Board from "@/models/boardModel";
import { decodeJwt, jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function getBoard(): Promise<BoardResponse | undefined> {
    await dbConnect();

    const session = cookies().get('session')?.value;

    if (!session) {
        return;
    }

    const valid = jwtVerify(session, new TextEncoder().encode(process.env.JWT_SECRET!));

    if (!valid) {
        return;
    }

    const decoded = decodeJwt(session);

    const userId = decoded?.id;

    const board = await Board.findOne({ userId });

    if (!board) {
        return;
    }

    return board;
}