import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerordersComponent } from './farmerorders.component';

describe('FarmerordersComponent', () => {
  let component: FarmerordersComponent;
  let fixture: ComponentFixture<FarmerordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerordersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FarmerordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
