import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultatProduitPopupComponent } from './consultat-produit-popup.component';

describe('ConsultatProduitPopupComponent', () => {
  let component: ConsultatProduitPopupComponent;
  let fixture: ComponentFixture<ConsultatProduitPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultatProduitPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultatProduitPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
