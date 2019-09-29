import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../user/user.service';
import { IUser } from '../../entities/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private accountState = new BehaviorSubject<boolean>(false);
  public isLoginIn$ = this.accountState.asObservable();

  constructor(private userService: UserService) { }

  public login(userLoginData: IUser): null | string {
    const userExist = this.userService.isUserExist(userLoginData);
    if (userExist) {
      this.userService.setCurrentUser(userLoginData);
      this.accountState.next(true);
      return null;
    } else {
      return 'User name or password incorrect';
    }
  }

  public registration(userLoginData: IUser): null | string {
    const loginAlreadyExist = this.userService.isLoginExist(userLoginData);

    if (!loginAlreadyExist) {
      this.userService.addUser(userLoginData);
      this.login(userLoginData);
      return null;
    } else {
      return 'This login already exist';
    }
  }

  public logout(): void {
    this.userService.setCurrentUser(null);
    this.accountState.next(false);
  }
}
