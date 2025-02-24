import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAchatComponent } from './add-achat.component';

describe('AddAchatComponent', () => {
  let component: AddAchatComponent;
  let fixture: ComponentFixture<AddAchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
