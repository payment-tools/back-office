import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { AdminFormComponent } from './admin-form.component';
import { AdminService } from '../services/admin-service';
import { EnterpriseService } from '../services/enterprise.service';
import { IEnterprise } from '../model/enterprise.model';

const mockEnterprises: IEnterprise[] = [
  { id: 1, name: 'Enterprise A' },
  { id: 2, name: 'Enterprise B' }
];

describe('AdminFormComponent', () => {
  let component: AdminFormComponent;
  let fixture: ComponentFixture<AdminFormComponent>;
  let adminServiceSpy: jasmine.SpyObj<AdminService>;
  let enterpriseServiceSpy: jasmine.SpyObj<EnterpriseService>;

  beforeEach(async () => {
    adminServiceSpy = jasmine.createSpyObj('AdminService', ['createEnterpriseAdmin']);
    enterpriseServiceSpy = jasmine.createSpyObj('EnterpriseService', ['getEnterprises']);
    enterpriseServiceSpy.getEnterprises.and.returnValue(of(mockEnterprises));

    await TestBed.configureTestingModule({
      declarations: [AdminFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AdminService, useValue: adminServiceSpy },
        { provide: EnterpriseService, useValue: enterpriseServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFormComponent);
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

  it('should initialize with empty enterprises on error', () => {
    enterpriseServiceSpy.getEnterprises.and.returnValue(throwError(() => new Error('Network error')));
    component.ngOnInit();
    expect(component.enterprises).toEqual(mockEnterprises);
  });

  it('should submit with the selected enterprise', () => {
    adminServiceSpy.createEnterpriseAdmin.and.returnValue(of({} as any));
    component.adminForm.setValue({
      lastname: 'Doe',
      firstname: 'John',
      username: 'jdoe',
      email: 'jdoe@test.com',
      phoneNumber: '0600000000',
      role: 'ENTERPRISE_ADMIN',
      enterprise: 1
    });

    component.onSubmit();

    const submitted = adminServiceSpy.createEnterpriseAdmin.calls.mostRecent().args[0];
    expect(submitted.enterprise).toEqual(mockEnterprises[0]);
  });

  it('getFormFieldHelpersAsString should return joined string', () => {
    component.formFieldHelpers = ['class-a', 'class-b'];
    expect(component.getFormFieldHelpersAsString()).toBe('class-a class-b');
  });
});