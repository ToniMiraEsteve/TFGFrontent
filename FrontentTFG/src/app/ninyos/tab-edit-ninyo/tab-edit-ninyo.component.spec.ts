import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabEditNinyoComponent } from './tab-edit-ninyo.component';

describe('TabEditNinyoComponent', () => {
  let component: TabEditNinyoComponent;
  let fixture: ComponentFixture<TabEditNinyoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabEditNinyoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabEditNinyoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
