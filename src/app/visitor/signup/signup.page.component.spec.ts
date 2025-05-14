import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupPageComponent } from '@app/visitor/signup/signup.page.component';
//import { UserStore } from '@app/core/store/user.store';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RegisterUserUseCase } from '@app/visitor/signup/domain/register-user.use-case';
import { AuthenticationService } from '@app/core/port/authentication.service';
import { UserService } from '@app/core/port/user.service';
import { UserStore } from '@app/core/store/user.store';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { EmailAlreadyTakenError } from './domain/email-already-taken.error';



describe('SignupPageComponent', () => {
  let component: SignupPageComponent;
  let fixture: ComponentFixture<SignupPageComponent>;

  let registerUseCase: RegisterUserUseCase;
  let name: DebugElement;
  let email: DebugElement;
  let password: DebugElement;
  let confirmPassword: DebugElement;
  let button: DebugElement;

  //phase login
 // let authenticationService: AuthenticationService;
 //let authenticationService: AuthenticationService;
 //let userService: UserService;
  //let userStore: UserStore;
  //let router: Router;
  const mockUserId = '123';
  const mockJwtToken = 'jwt-token';
  const mockJwtRefreshToken = 'refresh-token';
  const mockExpiresIn = '3600';
  const mockUser = { id: mockUserId, name: 'John Doe' };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupPageComponent],//i added
      //providers: [provideRouter([])],
      providers:[
        //{ provide: UserStore, useValue: {} },
       /* { provide: RegisterUserUseCase, useValue: {execute: jest.fn() } },
        { provide: AuthenticationService, useValue: { register: jest.fn() }},
        { provide: UserService, useValue: { create: jest.fn( ) }},
        { provide: UserStore, useValue: { register: jest.fn() }},
        { provide: Router, useValue: { navigate: jest.fn() }}*/
       // RegisterUserUseCase,
       { 
        provide: RegisterUserUseCase, 
        useValue: { 
          execute: jest.fn().mockRejectedValue(new EmailAlreadyTakenError('mock@email'))
        }
      },
        { 
          provide: AuthenticationService, 
          useValue: { 
            login: jest.fn().mockReturnValue(of({
              userId: mockUserId,
              jwtToken: mockJwtToken,
              jwtRefreshToken: mockJwtRefreshToken,
              expiresIn: mockExpiresIn,
            }))
          }
        },
        { provide: UserService, useValue: { fetch: jest.fn().mockReturnValue(of(mockUser)) }},
        { provide: UserStore, useValue: { load: jest.fn() }},
        { provide: Router, useValue: { navigate: jest.fn() }}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 

    registerUseCase = TestBed.inject(RegisterUserUseCase);
    name = fixture.debugElement.query(By.css('[data-testid="name"]'));
    email = fixture.debugElement.query(By.css('[data-testid="email"]'));
    password = fixture.debugElement.query(By.css('[data-testid="password"]'));
    confirmPassword = fixture.debugElement.query(By.css('[data-testid="confirm-password"]'));
    button = fixture.debugElement.query(By.css('[data-testid="submit-button"]'));

    //phase2
    registerUseCase = TestBed.inject(RegisterUserUseCase);
   // authenticationService = TestBed.inject(AuthenticationService);
    //userService = TestBed.inject(UserService);
    //userStore = TestBed.inject(UserStore);
    //router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // expect(component).toBeDefined();

  });

  describe('when page load', () => {
    it('should display fields name, email, password and confirm password', () => {
      expect(name).toBeTruthy();
      expect(email).toBeTruthy();
      expect(password).toBeTruthy();
      expect(confirmPassword).toBeTruthy();
    });
    it('should display a submit button', () => {
      expect(button).toBeTruthy();
    });
  })


  describe('when user interact with name field', () => {
    it('should display error message when field is empty', () => {
      name.nativeElement.value = '';
      name.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const error = fixture.debugElement.query(By.css('[data-testid="error-name-required"]'));
      const errorMessage = error.nativeElement.textContent;
      expect(errorMessage).toBe('Name is required.');
    });
    it('should display error message when field contain less than 3 characters', () => {
      name.nativeElement.value = 'a';
      name.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
  
      const error = fixture.debugElement.query(By.css('[data-testid="error-name-minlength"]'));
      const errorMessage = error.nativeElement.textContent;
      expect(errorMessage).toContain('Name must contain at least 3 caracters.');
    });
    it('should display error message when field contain more than 20 characters', () => {
      name.nativeElement.value = 'abcdefghijklmnopqrstuvwxyz';
      name.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
  
      const error = fixture.debugElement.query(By.css('[data-testid="error-name-maxlength"]'));
      const errorMessage = error.nativeElement.textContent;
      
      expect(errorMessage).toContain('Name must contain maximum 20 caracters.');
    });
    it('should display error message when field do not contain only letters', () => {
      name.nativeElement.value = '!';
      name.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
  
      const error = fixture.debugElement.query(By.css('[data-testid="error-name-pattern"]'));
      const errorMessage = error.nativeElement.textContent;
      
      expect(errorMessage).toContain('Name must contain only letters.');
    });
  });


  describe('when user interact with email field', () => {
  
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



  describe('when user interact with password field', () => {
   
    it('should display error message when field is empty', () => {
      password.nativeElement.value = '';
      password.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('[data-testid="error-password-required"]'));
      const errorMessage = error.nativeElement.textContent;

      expect(errorMessage).toContain('Password is required.');
    });

    it('should display error message when field contain less than 8 characters', () => {
      password.nativeElement.value = 'Ab1$e';
      password.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      
      const error = fixture.debugElement.query(By.css('[data-testid="error-password-minlength"]'));
      const errorMessage = error.nativeElement.textContent;

      expect(errorMessage).toContain('Password must contain at least 8 characters.');
    });

    it('should display error message when field do not contain at least 1 uppercase character', () => {
      password.nativeElement.value = 'abc1$def';
      password.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('[data-testid="error-password-pattern"]'));
      const errorMessage = error.nativeElement.textContent;

      expect(errorMessage).toContain('Password must contain at least one uppercase letter, one lowercase letter, one digit and one special character.');
    });

    it('should display error message when field do not contain at least 1 lowercase character', () => {
      password.nativeElement.value = 'ABC1$DEF';
      password.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('[data-testid="error-password-pattern"]'));
      const errorMessage = error.nativeElement.textContent;

      expect(errorMessage).toContain('Password must contain at least one uppercase letter, one lowercase letter, one digit and one special character.');
    });

    it('should display error message when field do not contain at least 1 digit', () => {
      password.nativeElement.value = 'Abc$defg';
      password.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('[data-testid="error-password-pattern"]'));
      const errorMessage = error.nativeElement.textContent;

      expect(errorMessage).toContain('Password must contain at least one uppercase letter, one lowercase letter, one digit and one special character.');
    });

    it('should display error message when field do not contain at least 1 of the following special characters ', () => {
      password.nativeElement.value = 'Abc1defg';
      password.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('[data-testid="error-password-pattern"]'));
      const errorMessage = error.nativeElement.textContent;

      expect(errorMessage).toContain('Password must contain at least one uppercase letter, one lowercase letter, one digit and one special character.');
    });
  });

  describe('when user interact with "confirm password" field', () => {
    it('should display error message when field is empty', () => {
      confirmPassword.nativeElement.value = '';
      confirmPassword.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const error = fixture.debugElement.query(By.css('[data-testid="error-confirm-password-required"]'));
      const errorMessage = error.nativeElement.textContent;
      expect(errorMessage).toContain('Confirm password is required.');
    });
    it('should display error message when field do not have same value as password field', () => {
      password.nativeElement.value = 'Abc1$def';
      password.nativeElement.dispatchEvent(new Event('input'));
      confirmPassword.nativeElement.value = 'Different1$';
      confirmPassword.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const error = fixture.debugElement.query(By.css('[data-testid="error-confirm-password-match"]'));
      const errorMessage = error.nativeElement.textContent;
      expect(errorMessage).toContain('Passwords do not match.');
    });
  });


  

 /* describe('when user submit the form', () => {
    it('should register the user with form values', () => {
      const userStore = TestBed.inject(UserStore);
     
      const spy = jest.spyOn(userStore,'register');
      //const spy2 = spyOn(userStore, '');
      name.nativeElement.value = 'John';
      name.nativeElement.dispatchEvent(new Event('input'));
      email.nativeElement.value = 'john@example.com';
      email.nativeElement.dispatchEvent(new Event('input'));
      password.nativeElement.value = 'Abc1$def';
      password.nativeElement.dispatchEvent(new Event('input'));
      confirmPassword.nativeElement.value = 'Abc1$def';
      confirmPassword.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      button.nativeElement.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({
        name: 'John',
        email: 'john@example.com',
        password: 'Abc1$def'
      });
    });
  });à revoir------------------------------------*/


  describe('when user submit a valid signup form', () => {
    it('should call register use case with correct visitor informations', () => {
      // Arrange
      name.nativeElement.value = 'John';
      name.nativeElement.dispatchEvent(new Event('input'));
      email.nativeElement.value = 'john.doe@acme.com';
      email.nativeElement.dispatchEvent(new Event('input'));
      password.nativeElement.value = 'Azerty!!!1';
      password.nativeElement.dispatchEvent(new Event('input'));
      confirmPassword.nativeElement.value = 'Azerty!!!1';
      confirmPassword.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      // Act
      button.nativeElement.click();
      fixture.detectChanges();
    
      // Assert
      expect(registerUseCase.execute).toHaveBeenCalledTimes(1);
      expect(registerUseCase.execute).toHaveBeenCalledWith({
        name: 'John',
        email: 'john.doe@acme.com',
        password: 'Azerty!!!1',
      });
    });
  });



  describe('when user submit an invalid signup form', () => {
    it('should not call register use case', () => {
      // Arrange
      email.nativeElement.value = 'invalid-email';
      email.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      // Act
      button.nativeElement.click();
      fixture.detectChanges();
    
      // Assert
      expect(registerUseCase.execute).not.toHaveBeenCalled();
    });
  });






});



