import { TestBed } from '@angular/core/testing';

import { ActiveBannerNotificationService } from './active-banner-notification.service';

describe('ActiveBannerNotificationService', () => {
  let service: ActiveBannerNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveBannerNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
