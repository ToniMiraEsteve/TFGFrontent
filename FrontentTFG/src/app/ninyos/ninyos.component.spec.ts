import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinyosComponent } from './ninyos.component';

describe('NinyosComponent', () => {
  let component: NinyosComponent;
  let fixture: ComponentFixture<NinyosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NinyosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NinyosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
