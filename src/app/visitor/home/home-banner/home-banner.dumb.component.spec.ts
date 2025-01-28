import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBannerDumbComponent } from './home-banner.dumb.component';

describe('HomeBannerDumbComponent', () => {
  let component: HomeBannerDumbComponent;
  let fixture: ComponentFixture<HomeBannerDumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeBannerDumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBannerDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
