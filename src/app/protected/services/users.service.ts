import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UsersList, User, UserResponse } from '../interface/users.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public usersList: User[] = [];

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // Servicio que devolverá todos los usuarios de la api(que se ha comprobado que en total son 12)
  public getUsers(): Observable<UsersList> {
    return this.http.get<UsersList>(`${this.baseUrl}/users?page=1&per_page=12`)
  }
  
  // Recibirá un id por el que posteriormente devolverá los datos de el usuario al cual corresponda ese id
  public getUserById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/users/${id}`)
  }
  
  // Recibirá un id por el que posteriormente eliminará el usuario al cual corresponda ese id
  public deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/users/${id}`)
  }


}
