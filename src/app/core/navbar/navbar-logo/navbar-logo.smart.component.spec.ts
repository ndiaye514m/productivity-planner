import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLogoSmartComponent } from './navbar-logo.smart.component';

describe('NavbarLogoSmartComponent', () => {
  let component: NavbarLogoSmartComponent;
  let fixture: ComponentFixture<NavbarLogoSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarLogoSmartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarLogoSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
