import { Component, Input, OnInit } from '@angular/core';
import { PopUpService } from '../../../services/dialogs/pop-up.service';

@Component({
  selector: 'sec-login-pop-up',
  templateUrl: './login-pop-up.component.html',
  styleUrls: ['./login-pop-up.component.scss']
})

export class LoginPopUpComponent implements OnInit {
  @Input() payload;
  constructor(private popUpService: PopUpService) {}
  ngOnInit() {}

  public showRegistrationPopUp(): void {
    this.popUpService.setPopUpState({isOpen: true, name: 'registration'});
  }

  public closePopUp(): void {
    this.popUpService.setPopUpState({isOpen: false});
  }
}
