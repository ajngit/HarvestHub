import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmminordersComponent } from './admminorders.component';

describe('AdmminordersComponent', () => {
  let component: AdmminordersComponent;
  let fixture: ComponentFixture<AdmminordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmminordersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmminordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
