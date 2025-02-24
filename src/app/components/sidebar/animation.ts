import {
  trigger,
  state,
  style,
  transition,
  animate,
  animateChild,
  query,
} from '@angular/animations';

export const animateText = trigger('animateText', [
  state(
    'hide',
    style({
      display: 'none',
      opacity: 0,
    })
  ),
  state(
    'show',
    style({
      opacity: 1,
    })
  ),
  transition('close => open', animate('350ms ease-in')),
  transition('open => close', animate('200ms ease-out')),
]);


export const animateMenuItem = trigger('animateMenuItem', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-50px)' }),
    animate('200ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
  ]),
  transition(':leave', [
    animate('200ms ease-out', style({ opacity: 0, transform: 'translateX(-50px)' }))
  ])
]);
