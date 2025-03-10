import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser.interfaces';
import { IResponse } from '../interfaces/iresponse.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpClient = inject(HttpClient)
  private apiUrl: string  = 'https://peticiones.online/api/users';

  getUsers(): Promise<IResponse> {
    console.log("Fetching users...");
    return firstValueFrom(this.httpClient.get<IResponse>(this.apiUrl));
  }






  getUser(id: number): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.apiUrl}/${id}`);
  }

  createUser(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(this.apiUrl, user);
  }

  updateUser(id: number, user: IUser): Observable<IUser> {
    return this.httpClient.put<IUser>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
