import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPopUpState } from '../../../../entities/pop-up';
import { PopUpService } from '../../../../services/dialogs/pop-up.service';

@Component({
  selector: 'sec-shading',
  templateUrl: './shading.component.html',
  styleUrls: ['./shading.component.scss']
})

export class ShadingComponent implements OnInit {
  public popUpState$: Observable<IPopUpState>;
  constructor(private popUpService: PopUpService) {}

  ngOnInit() {
    this.popUpState$ = this.popUpService.popUpState$;
  }

  public closePopUp(): void {
    this.popUpService.setPopUpState({ isOpen: false });
  }
}
