import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IPopUpState } from '../../entities/pop-up';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  private popUpState = new Subject<IPopUpState>();
  public popUpState$ = this.popUpState.asObservable();
  private popUpTransferData = new Subject<IPopUpState>();
  public popUpTransferData$ = this.popUpTransferData.asObservable();

  constructor() { }

  public setPopUpState(state: IPopUpState): void {
    this.popUpState.next(state);
  }

  public transferDataFromPopUp(dataFromPopUp): void {
    this.popUpTransferData.next(dataFromPopUp);
  }
}
