import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ScrollService {
  constructor() {}

  public handlePageScroll(): Observable<string> {
    return fromEvent(window, 'scroll')
      .pipe(
        debounceTime(30),
        map((event) => this.calcScrollPosition(event)),
        share()
      );
  }

  private calcScrollPosition(event): string {
    let position: string;
    const top: number = event.target.documentElement.scrollTop; // top padding after scrolling
    const height: number = event.target.documentElement.scrollHeight; // height of scrollable element
    const offset: number = event.target.documentElement.clientHeight; // viewed area

    if (top > 500) {
      position = 'middle';
    } else {
      position = 'top';
    }

    if (top > height - offset - offset * 0.4) {
      position = 'bottom';
    }
    return position;
  }
}
