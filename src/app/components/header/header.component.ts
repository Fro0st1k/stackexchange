import { Component, OnInit } from '@angular/core';
import { PopUpService } from '../../services/dialogs/pop-up.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'sec-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  constructor(
    private popUpService: PopUpService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  public showPopUp(popUpName: string): void {
    this.popUpService.setPopUpState({ isOpen: true, name: popUpName});
  }
}
