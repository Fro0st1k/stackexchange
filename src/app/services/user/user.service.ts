import { Injectable } from '@angular/core';
import { IUser } from '../../entities/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private currentUser = new BehaviorSubject<IUser>(null);
  public currentUser$ = this.currentUser.asObservable();

  protected users: IUser[] = [
    {
      password: 'qwerty',
      login: 'admin',
    }
  ];

  constructor() {}

  public isUserExist(userData: IUser): boolean {
    return this.users.some(user => user.password === userData.password && user.login === userData.login);
  }

  public isLoginExist(userData: IUser): boolean {
    return this.users.some(user => user.login === userData.login);
  }

  public setCurrentUser(userData: IUser): void {
    this.currentUser.next(userData);
  }

  public addUser(userData: IUser): void {
    this.users.push(userData);
  }
 }
