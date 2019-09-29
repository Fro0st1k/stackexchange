import { Component, Input, OnInit } from '@angular/core';
import { PopUpService } from '../../../services/dialogs/pop-up.service';

@Component({
  selector: 'sec-registration-pop-up',
  templateUrl: './registration-pop-up.component.html',
  styleUrls: ['./registration-pop-up.component.scss']
})

export class RegistrationPopUpComponent implements OnInit {
  @Input() payload;
  constructor(private popUpService: PopUpService) {}
  ngOnInit() {}

  public showLoginPopUp(): void {
    this.popUpService.setPopUpState({isOpen: true, name: 'login'});
  }

  public closePopUp(): void {
    this.popUpService.setPopUpState({isOpen: false});
  }
}
