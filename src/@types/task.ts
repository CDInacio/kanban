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
    comments?: string[];
}

export interface IsubTask {
    id: number;
    title: string;
    done: boolean;
}