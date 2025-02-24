import { Injectable } from '@angular/core';
import { Notification } from 'app/shared/stocker';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveBannerNotificationService {

  private notificationSubject: BehaviorSubject<Notification> = new BehaviorSubject<Notification>(null);
  public notification$: Observable<Notification> = this.notificationSubject.asObservable();


  public showNotification(notifaction: Notification): void {
    this.notificationSubject.next(notifaction);

  }

  public hideNotification(): void {
    this.notificationSubject.next(null);
  }
}
