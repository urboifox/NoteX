type DataResponse<T> = {
    status: number;
    count: number;
    data: T;
}

type BlogResponse = {
    _id: string;
    title: string;
    brief: string;
    content: string;
    createdAt: string;
    creatorId: string;
    slug: string;
    viewsCount: number;
    viewsIds: string[];
    tags: string[];
    coverImage: string;
    published: boolean;
    likesIds: string[];
    likesCount: number;
    updatedAt: string;
}

type BoardResponse = {
    _id: string;
    snapshot: string;
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
    emailConfirmed: boolean;
    islamicAzkar: boolean;
    islamicAzan: boolean;
    islamic: boolean;
    createdAt: string;
}

type TagResponse = {
    _id?: string;
    name: string;
    color: string;
}

type TodoResponse = {
    _id: string;
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    archived: boolean;
    tag: TagResponse;
    dueDate: string;
    description: string;
    tags: string[];
}

