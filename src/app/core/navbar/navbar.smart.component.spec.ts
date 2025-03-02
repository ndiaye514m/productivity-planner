import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSmartComponent } from './navbar.smart.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('NavbarSmartComponent', () => {
  let component: NavbarSmartComponent;
  let fixture: ComponentFixture<NavbarSmartComponent>;
  let debugElement: DebugElement;
  let title: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarSmartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarSmartComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  beforeEach(() => {
    title = debugElement.query(By.css('[data-testid=navbar-title]'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display webapp title', () => {
    expect(title.nativeElement.textContent).toContain('Productivity Planner');
  });
});
