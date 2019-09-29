import { Component, HostListener, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PopUpManagerService } from '../../../../services/dialogs/pop-up-manager/pop-up-manager.service';
import { IPopUpState } from '../../../../entities/pop-up';
import { PopUpService } from '../../../../services/dialogs/pop-up.service';

@Component({
  selector: 'sec-pop-up',
  templateUrl: './pop-up.component.html'
})

export class PopUpComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  @ViewChild('container', { read: ViewContainerRef, static: true }) containerRef: ViewContainerRef;

  constructor(
    private popUpManagerService: PopUpManagerService,
    private popUpService: PopUpService,
  ) {}

  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    event.stopPropagation();
  }

  ngOnInit() {
    this.watchOnPopUpState();
  }

  public renderPopUp(state: IPopUpState): void {
    const compFactory = this.popUpManagerService.getPopUpComponentFactory(state.name);
    this.clearPopUp();
    const popUpComponent = this.containerRef.createComponent(compFactory);

    if (state.payload) {
      popUpComponent.instance.payload = state.payload;
    }
  }

  public clearPopUp(): void {
    this.containerRef.clear();
  }

  private watchOnPopUpState() {
    this.popUpService.popUpState$
      .pipe(
        takeUntil(this.destroy$),
        tap((state: IPopUpState) => state.isOpen ? this.renderPopUp(state) : this.clearPopUp())
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
