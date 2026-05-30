import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartnershipFormComponent } from './add-partnership-form.component';

describe('AddPartnershipFormComponent', () => {
  let component: AddPartnershipFormComponent;
  let fixture: ComponentFixture<AddPartnershipFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPartnershipFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPartnershipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
