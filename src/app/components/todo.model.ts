export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    dueDate?: Date;
    priority?: 'low' | 'medium' | 'high';
    notes?: string;
}