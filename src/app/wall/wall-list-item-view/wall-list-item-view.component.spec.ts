import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WallListItemViewComponent } from './wall-list-item-view.component';

describe('WallListItemViewComponent', () => {
  let component: WallListItemViewComponent;
  let fixture: ComponentFixture<WallListItemViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallListItemViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WallListItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
