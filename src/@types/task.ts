export interface Itask {
    _id?: string;
    title: string;
    description?: string;
    priority?: string;
    createdAt?: string;
    tags?: string[];
    subTasks?: IsubTask[];
    status?: string;
    responsable?: string;
    comments?: CommentI[];
}

export interface IsubTask {
    id: number;
    title: string;
    done: boolean;
}

export interface CommentI {
    author: {
        name: string | null | undefined;
        Image: string | null | undefined;
    };
    id: number;
    text: string;
    taskId: string | undefined;
}