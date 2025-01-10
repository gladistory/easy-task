import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../../Task';
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private apiUrl = 'http://localhost:3001/api/tasks';

  constructor(private http: HttpClient) {}

  // Get all users
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

   // Create a new user
   createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

   // Deletar uma tarefa
   deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Atualizar uma tarefa
  updateTask(id: number, updatedTask: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, updatedTask);
  }

    // Obter uma tarefa pelo ID
    getTaskById(id: number): Observable<Task> {
      return this.http.get<Task>(`${this.apiUrl}/${id}`);
    }  


}
