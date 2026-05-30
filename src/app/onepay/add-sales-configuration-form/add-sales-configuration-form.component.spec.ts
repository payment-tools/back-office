import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesConfigurationFormComponent } from './add-sales-configuration-form.component';

describe('AddSalesConfigurationFormComponent', () => {
  let component: AddSalesConfigurationFormComponent;
  let fixture: ComponentFixture<AddSalesConfigurationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSalesConfigurationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSalesConfigurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
