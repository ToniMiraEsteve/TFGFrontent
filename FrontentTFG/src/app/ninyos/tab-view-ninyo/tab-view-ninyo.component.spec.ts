import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabViewNinyoComponent } from './tab-view-ninyo.component';

describe('TabViewNinyoComponent', () => {
  let component: TabViewNinyoComponent;
  let fixture: ComponentFixture<TabViewNinyoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabViewNinyoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabViewNinyoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
