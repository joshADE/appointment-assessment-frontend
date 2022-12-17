export type Response<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    data?: T;
    errors?: string[];
    warnings?: Warning[];
}

export type Warning = {
    code: string;
    message: string;
}