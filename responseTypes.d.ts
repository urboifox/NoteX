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
    islamicAzkar: boolean;
    islamicAzan: boolean;
    islamic: boolean;
    createdAt: string;
}

type TodoResponse = {
    _id: string;
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    archived: boolean;
    dueDate: string;
    description: string;
    tags: string[];
}

