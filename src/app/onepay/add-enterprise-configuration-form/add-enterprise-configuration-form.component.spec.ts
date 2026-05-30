import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnterpriseConfigurationFormComponent } from './add-enterprise-configuration-form.component';

describe('AddEnterpriseConfigurationFormComponent', () => {
  let component: AddEnterpriseConfigurationFormComponent;
  let fixture: ComponentFixture<AddEnterpriseConfigurationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEnterpriseConfigurationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEnterpriseConfigurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
