type DataResponse<T> = {
    status: number;
    count: number;
    data: T;
}

type DiaryResponse = {
    _id: string;
    brief: string;
    content: string;
    createdAt: string;
}

type SessionResponse = {
    _id: string;
    time: number;
    creatorId: string;
    sessionName: string;
    createdAt: string;
}

type UserResponse = {
    _id: string;
    username: string;
    email: string;
    createdAt: string;
}

