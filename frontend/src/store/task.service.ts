import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _host = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this._host}/tasks`);
  }

  saveTask(task: Task): Observable<string> {
    return this.http.post<string>(`${this._host}/tasks`, {
      title: task.title,
      status: task.status,
    });
  }

  updateStatusTask(taskId: number, status: boolean): Observable<string> {
    return this.http.put<string>(`${this._host}/task/status`, {
      id: taskId,
      status: status,
    });
  }

  getTask(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this._host}/tasks/${taskId}`);
  }

  updateTask(task: Task): Observable<string> {
    return this.http.put<string>(`${this._host}/task`, {
      id: task.taskId,
      title: task.title,
      status: task.status,
    });
  }

  deletTask(taskId: number): Observable<string> {
    return this.http.delete<string>(`${this._host}/task/${taskId}`);
  }
}
