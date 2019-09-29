import { Component, Input, OnInit } from '@angular/core';
import { PopUpService } from '../../../services/dialogs/pop-up.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sec-login-pop-up',
  templateUrl: './login-pop-up.component.html',
  styleUrls: ['./login-pop-up.component.scss']
})

export class LoginPopUpComponent implements OnInit {
  @Input() payload;
  public loginPopUpForm: FormGroup;

  constructor(
    private popUpService: PopUpService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.loginPopUpForm = this.fb.group({
      login: ['admin', Validators.required],
      password: ['qwerty', Validators.required]
    });
  }

  public showRegistrationPopUp(): void {
    this.popUpService.setPopUpState({ isOpen: true, name: 'registration' });
  }

  public closePopUp(): void {
    this.popUpService.setPopUpState({ isOpen: false });
  }

  public login(): void {
    if (this.loginPopUpForm.valid) {
      this.payload = {
        ...this.payload,
        message: this.authService.login(this.loginPopUpForm.value)
      };
      this.payload.redirectUrl ? this.router.navigate([this.payload.redirectUrl]) : null;
      this.payload.message === null ? this.closePopUp() : null;
    }
  }
}
