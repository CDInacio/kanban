export interface Itask {
    _id?: string;
    title: string;
    description?: string;
    priority?: string;
    createdAt?: string;
    tags?: string[];
    subTasks?: string[];
    status?: string;
    responsable?: string;
    comments?: string[];
}