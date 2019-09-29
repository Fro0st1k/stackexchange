import { Component } from '@angular/core';
import { slider } from '../animations/router.animations';

@Component({
  selector: 'sec-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slider]
})

export class AppComponent {
  public prepareRoute(outlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
