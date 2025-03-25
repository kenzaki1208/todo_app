import { Injectable } from '@angular/core';
import {Todo} from './todo.model'


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];

  constructor() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos, (key, value) => {
        if (key === 'dueData' && value) {
          return new Date(value);
        }
        return value;
      })
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  getTodos(): Todo[] {
    return [...this.todos];
  }

  addTodo(title: string, dueDate?: Date, priority?: 'low' | 'medium' | 'high', notes?: string): Todo[] {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      title,
      completed: false,
      dueDate,
      priority: priority || 'low',
      notes
    };
    this.todos.push(newTodo);
    this.saveToLocalStorage();
    return this.getTodos();
  }

  toggleTodo(id: number) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
    this.saveToLocalStorage();
    return this.getTodos();
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveToLocalStorage();
    return this.getTodos();
  }

  updateTodo(id: number, newTitle: string, newNotes?: string): Todo[] {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.title = newTitle;
      if (newNotes !== undefined) {
        todo.notes = newNotes;
      }
    }
    this.saveToLocalStorage();
    return this.getTodos();
  }

  clearCompleted(): Todo[] {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.saveToLocalStorage();
    return this.getTodos();
  }
}

