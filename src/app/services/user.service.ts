import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser.interfaces';
import { IResponse } from '../interfaces/iresponse.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpClient = inject(HttpClient)
  private apiUrl: string  = 'https://peticiones.online/api/users';

  getUsers( page : number = 1): Promise<IResponse> {
    return lastValueFrom(this.httpClient.get<IResponse>(`${this.apiUrl}?page=${page}`));
  }

  getUserById(id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.get<IUser>(`${this.apiUrl}/${id}`));
  }

  deleteUser(id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.delete<IUser>(`${this.apiUrl}/${id}`));
  }

  updateUser(user: IUser): Promise<IUser> {
    let { _id, ...userBody } = user;
    return lastValueFrom(this.httpClient.put<IUser>(`${this.apiUrl}/${_id}`, userBody));
  }

  createUser(user: IUser): Promise<IUser> {
    let { _id, ...userBody } = user;
    return lastValueFrom(this.httpClient.post<IUser>(this.apiUrl, userBody));
  }



  
}
