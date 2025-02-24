import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ActiveBannerNotificationService } from 'app/services/active-banner-notification.service';
import { Notification } from '../stocker';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('fadeOut', [
      state('void', style({ opacity: 1 })),
      transition(':leave', animate('500ms ease-in-out', keyframes([
        style({ opacity: 1, offset: 0 }),
        style({ opacity: 0, offset: 1 })
      ])))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public notification: Notification;
  bannerOpacity: number = 1;
  timer: any;
  constructor(private notificationService: ActiveBannerNotificationService) { }

  ngOnInit(): void {
    this.notificationService.notification$.subscribe(notif => {
      this.notification = notif;
      this.startTimer();
    });
  }

  public closeBanner(): void {
    this.notificationService.hideNotification();
    this.stopTimer();
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      this.bannerOpacity -= 0.5; // Diminue l'opacité de 0.1 à chaque intervalle
      if (this.bannerOpacity <= 0) {
        this.closeBanner(); // Appelle la méthode pour masquer le banner lorsque l'opacité atteint 0
      }
    }, 10000);

  }

  stopTimer(): void {
    clearInterval(this.timer);
  }



}
