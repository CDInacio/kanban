export interface Itask {
    id: string;
    title: string;
    createdAt: string;
    description: string;
    status?: string;
    responsable?: string;
    comments?: string[];
}