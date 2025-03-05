import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPageComponent } from './signup.page.component';
import { AuthenticationService } from '../../core/authentication.service';
import { AuthenticationFirebaseService } from '../../core/ authentication-firebase.service';

describe('SignupPageComponent', () => {
  let component: SignupPageComponent;
  let fixture: ComponentFixture<SignupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupPageComponent],//i added
      //providers: [provideRouter([])],
      providers:[AuthenticationService,AuthenticationFirebaseService],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
