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