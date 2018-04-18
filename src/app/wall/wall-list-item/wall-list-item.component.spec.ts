import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WallListItemComponent } from './wall-list-item.component';

describe('WallListItemComponent', () => {
  let component: WallListItemComponent;
  let fixture: ComponentFixture<WallListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WallListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
