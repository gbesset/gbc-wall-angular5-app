import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubmenuNavbarComponent } from './admin-submenu-navbar.component';

describe('AdminSubmenuNavbarComponent', () => {
  let component: AdminSubmenuNavbarComponent;
  let fixture: ComponentFixture<AdminSubmenuNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubmenuNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubmenuNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
