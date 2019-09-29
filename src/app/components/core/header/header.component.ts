import { Component, OnInit } from '@angular/core';
import { PopUpService } from '../../../services/dialogs/pop-up.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Component({
  selector: 'sec-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  public isLogin$: Observable<boolean>;

  constructor(
    private popUpService: PopUpService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLogin$ = this.authService.isLoginIn$.pipe(share());
  }

  public showPopUp(popUpName: string): void {
    this.popUpService.setPopUpState({ isOpen: true, name: popUpName });
  }

  public logout(): void {
    this.authService.logout();
  }
}
