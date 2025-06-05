import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorValDialogComponent } from './error-val-dialog.component';

describe('ErrorValDialogComponent', () => {
  let component: ErrorValDialogComponent;
  let fixture: ComponentFixture<ErrorValDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorValDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorValDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
