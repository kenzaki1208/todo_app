import { Component } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { ToastrService } from 'ngx-toastr';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'app-todo',
    templateUrl: './todo_app.component.html',
    styleUrls: ['./todo_app.component.scss'],
    animations: [
        trigger('todoAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(-20px)'}),
                animate('300ms ease-out'), style({ opacity: 1, transform: 'translateY(0)'})
            ]),
            transition(':leave', [
                style({ opacity: 1, transform: 'translateY(0)' }),
                animate('300ms ease-in'), style({ opacity: 0, transform: 'translateY(-20px)'})
            ])
        ])
    ]
})
export class TodoAppComponent {
    todos: Todo[] = [];
    newTodo: string = '';
    newDueDate: string = '';
    today: Date = new Date();
    editingTodo: Todo | null = null;
    editedTitle: string = '';
    filter: 'all' | 'active' | 'completed' = 'all';
    searchQuery: string = '';
    newPriority: 'low' | 'medium' | 'high' = 'low';
    sortBy: 'title' | 'dueDate' | 'priority' = 'title';
    newNotes: string = '';
    editedNotes: string = '';

    constructor(private todoService: TodoService, private toastr: ToastrService) {
        this.todos = this.todoService.getTodos();
        this.today.setHours(0, 0, 0, 0);
    }


    get filteredTodos(): Todo[] {
        let filtered = [...this.todos];

        if (this.filter === 'active') {
            filtered = filtered.filter(todo => !todo.completed);
        } else if (this.filter === 'completed') {
            filtered = filtered.filter(todo => todo.completed);
        }

        if (this.searchQuery.trim()) {
            filtered = filtered.filter(todo =>
                todo.title.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }

        if (this.sortBy === 'title') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else if (this.sortBy === 'dueDate') {
            filtered.sort((a, b) => {
                const dateA = a.dueDate ? new Date(a.dueDate).getTime(): Infinity;
                const dateB = b.dueDate ? new Date(b.dueDate).getTime(): Infinity;
                return dateA - dateB;
            });
        } else if (this.sortBy === 'priority') {
            const priorityOrder = {high: 3, medium: 2, low: 1};
            filtered.sort((a, b) => priorityOrder[b.priority || 'low'] - priorityOrder[a.priority || 'low'])
        }

        return filtered;
    }

    addTodo() {
        if (this.newTodo.trim()) {
            const dueDate = this.newDueDate ? new Date(this.newDueDate) : undefined;
            this.todos = this.todoService.addTodo(this.newTodo, undefined, this.newPriority);
            this.toastr.success("Thêm việc thành công!")
            this.newTodo = '';
            this.newDueDate = '';
            this.newPriority = 'low';
            this.newNotes = '';
        }
    }

    toggleTodo(id: number) {
        this.todos = this.todoService.toggleTodo(id);
    }

    deleteTodo(id: number) {
        this.todos = this.todoService.deleteTodo(id);
        this.toastr.success("Xóa công việc thành công!")
    }

    startEdit(todo: Todo) {
        this.editingTodo = todo;
        this.editedTitle = todo.title;
        this.editedNotes = todo.notes || '';
    }

    saveEdit(id: number) {
        if (this.editedTitle.trim() && this.editingTodo) {
            this.todos = this.todoService.updateTodo(id, this.editedTitle, this.editedNotes);
            this.toastr.success("Cập nhật công việc thành công!")
            this.editingTodo = null;
            this.editedNotes = '';
        }
    }

    cancelEdit() {
        this.editingTodo = null;
        this.editedTitle = '';
        this.editedNotes = '';
    }

    clearCompleted() {
        this.todos = this.todoService.clearCompleted();
    }


}