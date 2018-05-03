import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WallCommentFormComponent } from './wall-comment-form.component';

describe('WallCommentFormComponent', () => {
  let component: WallCommentFormComponent;
  let fixture: ComponentFixture<WallCommentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallCommentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WallCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
