import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultatAchatComponent } from './consultat-achat.component';

describe('ConsultatAchatComponent', () => {
  let component: ConsultatAchatComponent;
  let fixture: ComponentFixture<ConsultatAchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultatAchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultatAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
