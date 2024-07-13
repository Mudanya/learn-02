import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient)
  constructor() { }

  addUser(user: User): Observable<{ user: User }> {
    return this.http.post<{ user: User }>("https://api.realworld.io/api/users", { user })
  }
  loginUser(user: User): Observable<{ user: User }> {
    return this.http.post<{ user: User }>("https://api.realworld.io/api/users/login", { user })
  }
  getUser(): Observable<{ user: User }> {
    return this.http.get<{ user: User }>("https://api.realworld.io/api/user")
  }
}
