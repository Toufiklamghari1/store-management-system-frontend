import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDialogComponentComponent } from './pdf-dialog-component.component';

describe('PdfDialogComponentComponent', () => {
  let component: PdfDialogComponentComponent;
  let fixture: ComponentFixture<PdfDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfDialogComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
