import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPageComponent } from './signup.page.component';
import { AuthenticationService } from '../../core/port/authentication.service';
import { DebugElement } from '@angular/core';
import { UserStore } from '../../core/store/user.store';
import { By } from '@angular/platform-browser';

describe('SignupPageComponent', () => {
  let component: SignupPageComponent;
  let fixture: ComponentFixture<SignupPageComponent>;


  let name: DebugElement;
  let email: DebugElement;
  let password: DebugElement;
  let confirmPassword: DebugElement;
  let button: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupPageComponent],//i added
      //providers: [provideRouter([])],
      providers:[
        { provide: UserStore, useValue: {} },
        { provide: AuthenticationService, useValue: {} },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    name = fixture.debugElement.query(By.css('[data-testid="name"]'));
    email = fixture.debugElement.query(By.css('[data-testid="email"]'));
    password = fixture.debugElement.query(By.css('[data-testid="password"]'));
    confirmPassword = fixture.debugElement.query(By.css('[data-testid="confirm-password"]'));
    button = fixture.debugElement.query(By.css('[data-testid="submit-button"]'));

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when page load', () => {
    it('should diplay fields name, email, password and confirm password', () => {
      expect(name).toBeTruthy();
      expect(email).toBeTruthy();
      expect(password).toBeTruthy();
      expect(confirmPassword).toBeTruthy();
    });
    it('should diplay a submit button', () => {
      expect(button).toBeTruthy();
    });
  })


  describe('when user interact with email field', () => {
    it.todo('should display error message when field is empty');
    it.todo('should display error message when field do not contain a valid HTML5 email');
    it('should display error message when field is empty', () => {
      email.nativeElement.value = '';
      email.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('[data-testid="error-email-required"]'));
      const errorMessage = error.nativeElement.textContent;

      expect(errorMessage).toContain('Email is required.');
    });

    it('should display error message when field do not contain a valid HTML5 email', () => {
      email.nativeElement.value = 'invalid-email';
      email.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('[data-testid="error-email-pattern"]'));
      const errorMessage = error.nativeElement.textContent;

      expect(errorMessage).toContain('Email must be valid.');
    });
  });

});



