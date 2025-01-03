import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesFormComponent } from './add-sales-form.component';

describe('AddSalesFormComponent', () => {
  let component: AddSalesFormComponent;
  let fixture: ComponentFixture<AddSalesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSalesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSalesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
