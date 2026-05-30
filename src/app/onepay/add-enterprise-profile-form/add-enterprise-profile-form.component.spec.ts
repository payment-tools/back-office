import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnterpriseProfileFormComponent } from './add-enterprise-profile-form.component';

describe('AddEnterpriseProfileFormComponent', () => {
  let component: AddEnterpriseProfileFormComponent;
  let fixture: ComponentFixture<AddEnterpriseProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEnterpriseProfileFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEnterpriseProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
