import { Component, Input, OnInit } from '@angular/core';
import { PopUpService } from '../../../services/dialogs/pop-up.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'sec-registration-pop-up',
  templateUrl: './registration-pop-up.component.html',
  styleUrls: ['./registration-pop-up.component.scss']
})

export class RegistrationPopUpComponent implements OnInit {
  @Input() payload = {};
  public registrationPopUpForm: FormGroup;

  constructor(
    private popUpService: PopUpService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.registrationPopUpForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    }, {
      validators: this.comparePasswords.bind(this)
    });
  }

  private comparePasswords(registrationPopUpForm: FormGroup) {
    const isPasswordMatch = registrationPopUpForm.get('password').value === registrationPopUpForm.get('repeatPassword').value;
    this.payload = {...this.payload, message: isPasswordMatch ? '' : `Passwords don't match`};
    return isPasswordMatch ? null : {};
  }

  public registration(): void {
    if (this.registrationPopUpForm.valid) {
      this.payload = {
        ...this.payload,
        message: this.authService.registration(this.registrationPopUpForm.value)
      };
      this.closePopUp();
    }
  }

  public showLoginPopUp(): void {
    this.popUpService.setPopUpState({ isOpen: true, name: 'login' });
  }

  public closePopUp(): void {
    this.popUpService.setPopUpState({ isOpen: false });
  }
}
