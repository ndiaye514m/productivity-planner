import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBannerDumbComponent } from './home-banner.dumb.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HomeBannerDumbComponent', () => {
  let component: HomeBannerDumbComponent;
  let fixture: ComponentFixture<HomeBannerDumbComponent>;
  let debugElement: DebugElement;
  let title: DebugElement;
  let description: DebugElement;
  let buttonLabel: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeBannerDumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBannerDumbComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.componentRef.setInput('title','expectedTitle');
    fixture.componentRef.setInput('description','expectedDescription');
    fixture.componentRef.setInput('buttonLabel','expectedButtonLabel');
    fixture.detectChanges();
  });

  beforeEach(() => {
      title=debugElement.query(By.css('[data-testid=banner-title]'));
      description=debugElement.query(By.css('[data-testid=banner-description]'));
      buttonLabel=debugElement.query(By.css('[data-testid=banner-buttonLabel]'));
    });



  it('should create', () => {
    //expect(component).not.toBeNull();
    expect(component).toBeTruthy();
  });

   
  it('should display title',()=>{
    expect(title.nativeElement.textContent).toContain('expectedTitle');
  });
  
  it('should display description',()=>{
    expect(description.nativeElement.textContent).toContain('expectedDescription');
  });

  it('should display button',()=>{
    expect(buttonLabel.nativeElement.textContent).toContain('expectedButtonLabel');
  });
  
  it('should trigger event on button click',()=>{
  
    jest.spyOn(component.clicked,'emit');
    
    buttonLabel.nativeElement.click();
    
    
    expect(component.clicked.emit).toHaveBeenNthCalledWith(1);
  }); 
});
