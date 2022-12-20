import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UsersList, User, UserResponse } from '../interface/users.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  public usersList: User[] = [];

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UsersList> {
    return this.http.get<UsersList>(`${this.baseUrl}/users?page=1&per_page=12`)
  } 

  getUserById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/users/${id}`)
  }
  
  deleteUser(id: number)   {
    return this.http.delete(`${this.baseUrl}/users/${id}`)
  }


}
