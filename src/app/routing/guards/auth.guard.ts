import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { take } from 'rxjs/operators';
import { PopUpService } from '../../services/dialogs/pop-up.service';


@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private popUpService: PopUpService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAccess(state.url);
  }

  private checkAccess(redirectUrl: string): boolean {
    let isUserLogin: boolean;
    this.authService.isLoginIn$
      .pipe(take(1))
      .subscribe(isLoginIn => isUserLogin = isLoginIn);

    if (isUserLogin) {
      return true;
    } else {
      this.router.navigate(['']);
      this.popUpService.setPopUpState({
        isOpen: true,
        name: 'login',
        payload: { message: 'To access please login or register', redirectUrl: `${redirectUrl}` }
      });
    }
  }
}
