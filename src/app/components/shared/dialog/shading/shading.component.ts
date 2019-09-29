import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPopUpState } from '../../../../entities/pop-up';
import { PopUpService } from '../../../../services/dialogs/pop-up.service';
import { animate, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'sec-shading',
  templateUrl: './shading.component.html',
  styleUrls: ['./shading.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        query('.shading', [
          style({ opacity: '0'}),
          animate('300ms ease-out', style({opacity: '1'}))
        ])
      ]),
      transition('* => void', [
        query('.shading', [
          style({ opacity: '1'}),
          animate('300ms ease-out', style({opacity: '0'}))
        ])
      ]),
    ])
  ]
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
