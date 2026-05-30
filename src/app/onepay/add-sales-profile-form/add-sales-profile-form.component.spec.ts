import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesProfileFormComponent } from './add-sales-profile-form.component';

describe('AddSalesProfileFormComponent', () => {
  let component: AddSalesProfileFormComponent;
  let fixture: ComponentFixture<AddSalesProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSalesProfileFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSalesProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
