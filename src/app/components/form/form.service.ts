import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private users: { email: string, password: string }[] = [];

  constructor() { }

  register(email: string, password: string): boolean {
    if (this.users.find(user => user.email === email)) {
      return false; 
    }
    this.users.push({ email, password });
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(user => user.email === email && user.password === password);
    return !!user; 
  }
}