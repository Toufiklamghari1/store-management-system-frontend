import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultatVenteComponent } from './consultat-vente.component';

describe('ConsultatVenteComponent', () => {
  let component: ConsultatVenteComponent;
  let fixture: ComponentFixture<ConsultatVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultatVenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultatVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
