import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { LoginPopUpComponent } from '../../../components/dialogs/login-pop-up/login-pop-up.component';
import { RegistrationPopUpComponent } from '../../../components/dialogs/registration-pop-up/registration-pop-up.component';

@Injectable({
  providedIn: 'root'
})

export class PopUpManagerService {
  private popUpList = {
    login: LoginPopUpComponent,
    registration: RegistrationPopUpComponent
  };

  private popUpFactories = {};

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  private createPopUpComponentFactory(popUpComponentName: string): ComponentFactory<any> {
    this.popUpFactories[popUpComponentName] = this.componentFactoryResolver.resolveComponentFactory(this.popUpList[popUpComponentName]);
    return this.popUpFactories[popUpComponentName];
  }

  public getPopUpComponentFactory(popUpComponentName: string): ComponentFactory<any> {
    return this.popUpFactories[popUpComponentName]
      ? this.popUpFactories[popUpComponentName]
      : this.createPopUpComponentFactory(popUpComponentName);
  }
}
