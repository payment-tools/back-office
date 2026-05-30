import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { AddEnterpriseProfileFormComponent } from './add-enterprise-profile-form.component';
import { EnterpriseProfileService } from '../services/enterprise-profile.service';
import { EnterpriseService } from '../services/enterprise.service';
import { IEnterprise } from '../model/enterprise.model';

const mockEnterprises: IEnterprise[] = [
  { id: 1, name: 'Enterprise A' },
  { id: 2, name: 'Enterprise B' }
];

describe('AddEnterpriseProfileFormComponent', () => {
  let component: AddEnterpriseProfileFormComponent;
  let fixture: ComponentFixture<AddEnterpriseProfileFormComponent>;
  let enterpriseProfileServiceSpy: jasmine.SpyObj<EnterpriseProfileService>;
  let enterpriseServiceSpy: jasmine.SpyObj<EnterpriseService>;

  beforeEach(async () => {
    enterpriseProfileServiceSpy = jasmine.createSpyObj('EnterpriseProfileService', ['createEnterpriseProfile']);
    enterpriseServiceSpy = jasmine.createSpyObj('EnterpriseService', ['getEnterprises']);
    enterpriseServiceSpy.getEnterprises.and.returnValue(of(mockEnterprises));

    await TestBed.configureTestingModule({
      declarations: [AddEnterpriseProfileFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: EnterpriseProfileService, useValue: enterpriseProfileServiceSpy },
        { provide: EnterpriseService, useValue: enterpriseServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEnterpriseProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load enterprises on init', () => {
    expect(enterpriseServiceSpy.getEnterprises).toHaveBeenCalled();
    expect(component.enterprises).toEqual(mockEnterprises);
  });

  it('should keep enterprises empty on load error', () => {
    enterpriseServiceSpy.getEnterprises.and.returnValue(throwError(() => new Error('error')));
    component.ngOnInit();
    expect(component.enterprises).toEqual(mockEnterprises);
  });

  it('should submit with the selected enterprise', () => {
    enterpriseProfileServiceSpy.createEnterpriseProfile.and.returnValue(of({} as any));
    component.adminForm.setValue({
      lastname: 'Diop',
      firstname: 'Fatou',
      username: 'fdiop',
      email: 'fdiop@test.com',
      phoneNumber: '0700000000',
      role: 'ENTERPRISE_FINANCE',
      enterprise: 1
    });

    component.onSubmit();

    const submitted = enterpriseProfileServiceSpy.createEnterpriseProfile.calls.mostRecent().args[0];
    expect(submitted.enterprise).toEqual(mockEnterprises[0]);
  });

  it('getFormFieldHelpersAsString should return joined string', () => {
    component.formFieldHelpers = ['a', 'b'];
    expect(component.getFormFieldHelpersAsString()).toBe('a b');
  });
});