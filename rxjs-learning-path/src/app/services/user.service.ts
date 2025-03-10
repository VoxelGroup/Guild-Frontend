import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserData} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpClient = inject(HttpClient);

  getUser(): Observable<UserData> {
    return this.httpClient.get<UserData>('fakeData/user.json');
  }
}
