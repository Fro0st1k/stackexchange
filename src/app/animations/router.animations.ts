import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const slider =
  trigger('routeAnimations', [
    transition('* => isLeft', slideTo('left') ),
    transition('* => isRight', slideTo('right') ),
    transition('isRight => *', slideTo('left') ),
    transition('isLeft => *', slideTo('right') )
  ]);

function slideTo(direction) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        minHeight: 'calc(100vh - 80px)',
        position: 'absolute',
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100vw'})
    ]),
    group([
      query(':leave', [
        animate('400ms ease', style({ [direction]: '100vw'}))
      ], optional),
      query(':enter', [
        animate('400ms ease', style({ [direction]: '0%'}))
      ])
    ]),
  ];
}
