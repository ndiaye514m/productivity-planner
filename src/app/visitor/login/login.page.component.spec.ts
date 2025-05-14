import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login.page.component';
//import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LoginUserUseCase } from './domain/login-user.use-case';
import { DebugElement } from '@angular/core';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
 //let email: DebugElement;
  let password: DebugElement;

  /*let email: DebugElement;
  let password: DebugElement;*/

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent],
      providers: [
        { provide: LoginUserUseCase, useValue: {execute: jest.fn( )} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

   // email = fixture.debugElement.query(By.css('[data-testid="email"]'));
    password = fixture.debugElement.query(By.css('[data-testid="password"]'));
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when page load',()=>{
    it('should display email field',() => {
      //Arrange
      const email = fixture.debugElement.query(By.css('[data-testid="email"]'));
     
      //Act

      //Assert
      expect(email).toBeTruthy();
    });

  

    it('should display password field',()=>{

       //Arrange
       const password = fixture.debugElement.query(By.css('[data-testid="password"]'));
     
       //Act
 
       //Assert
       expect(password).toBeTruthy();
    });
    it('should display login button',()=>{
       //Arrange
       const submitbutton = fixture.debugElement.query(By.css('[data-testid="submit-button"]'));
     
       //Act
 
       //Assert
       expect(submitbutton).toBeTruthy();
    });
    })

  
    describe('when user interact with email field', () => {
      it('should display error message when field is empty',()=>{
        //Arrange
        const email = fixture.debugElement.query(By.css('[data-testid="email"]'));

        //Act
        email.nativeElement.value = '';
        email.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        const error = fixture.debugElement.query(By.css('[data-testid="error-email-required"]'));
        const errorMessage = error.nativeElement.textContent;
      
        //Assert
        expect(errorMessage).toContain('Email is required.');
        
      });
  
      it('should display error message when field do not contain a valid HTML5 email',()=>{
        //Arrange
        const email = fixture.debugElement.query(By.css('[data-testid="email"]'));
        //Act
        email.nativeElement.value = 'invalid-email-exemple';
        email.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        const error = fixture.debugElement.query(By.css('[data-testid="error-email-pattern"]'));
        const errorMessage = error.nativeElement.textContent;
        
        //Assert
        expect(errorMessage).toContain('Email must be valid.');
      });
    })

    describe('when user interact with password field', () => {
      it('should display error message when field is empty',()=>{

        //Arrange
        const password = fixture.debugElement.query(By.css('[data-testid="password"]'));

        //Act
        password.nativeElement.value = '';
        password.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        const error = fixture.debugElement.query(By.css('[data-testid="error-password-required"]'));
        const errorMessage = error.nativeElement.textContent;
      
        //Assert
        expect(errorMessage).toContain('Password is required.');
      });

      it('should hide error message when field is valid', () => {
        // Act
        password.nativeElement.value = 'password-1234';
        password.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        const error = fixture.debugElement.query(By.css('[data-testid="error-password-required"]'));
        // Assert
        expect(error).toBeNull();
      });

    }); 
  



});
