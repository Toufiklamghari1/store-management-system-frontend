import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProduitPopupComponent } from './add-produit-popup.component';

describe('AddProduitPopupComponent', () => {
  let component: AddProduitPopupComponent;
  let fixture: ComponentFixture<AddProduitPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProduitPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProduitPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
