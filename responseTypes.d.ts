type DataResponse<T> = {
    status: number;
    data: T;
}

type DiaryResponse = {
    _id: string;
    brief: string;
    content: string;
    createdAt: string;
}