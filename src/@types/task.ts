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
    deadline?: Date;
}

export interface IsubTask {
    id: number;
    title: string;
    done: boolean;
}

export interface CommentI {
    taskId: string | undefined;
    author: {
        name: string | null | undefined;
        image: string | null | undefined;
    };
    id: number;
    text: string;
    createdAt: string
}