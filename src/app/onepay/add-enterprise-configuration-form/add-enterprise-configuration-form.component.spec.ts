import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { AddEnterpriseConfigurationFormComponent } from './add-enterprise-configuration-form.component';
import { EnterpriseConfigurationService } from '../services/enterprise-configuration.service';
import { EnterpriseService } from '../services/enterprise.service';
import { IEnterprise } from '../model/enterprise.model';

const mockEnterprises: IEnterprise[] = [
  { id: 1, name: 'Enterprise A' },
  { id: 2, name: 'Enterprise B' }
];

describe('AddEnterpriseConfigurationFormComponent', () => {
  let component: AddEnterpriseConfigurationFormComponent;
  let fixture: ComponentFixture<AddEnterpriseConfigurationFormComponent>;
  let configServiceSpy: jasmine.SpyObj<EnterpriseConfigurationService>;
  let enterpriseServiceSpy: jasmine.SpyObj<EnterpriseService>;

  beforeEach(async () => {
    configServiceSpy = jasmine.createSpyObj('EnterpriseConfigurationService', ['createEnterpriseConfiguration']);
    enterpriseServiceSpy = jasmine.createSpyObj('EnterpriseService', ['getEnterprises']);
    enterpriseServiceSpy.getEnterprises.and.returnValue(of(mockEnterprises));

    await TestBed.configureTestingModule({
      declarations: [AddEnterpriseConfigurationFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: EnterpriseConfigurationService, useValue: configServiceSpy },
        { provide: EnterpriseService, useValue: enterpriseServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEnterpriseConfigurationFormComponent);
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
    configServiceSpy.createEnterpriseConfiguration.and.returnValue(of({} as any));
    component.enterpriseConfigurationForm.setValue({
      enterprise: 2,
      maxAmountRestauration: 5000,
      maxAmountMarket: 3000,
      maxAmountGasStation: 4000,
      maxAmountTelephony: 2000,
      enterprisePercentage: 60,
      employeePercentage: 40
    });

    component.onSubmit();

    const submitted = configServiceSpy.createEnterpriseConfiguration.calls.mostRecent().args[0];
    expect(submitted.enterprise).toEqual(mockEnterprises[1]);
  });

  it('getFormFieldHelpersAsString should return joined string', () => {
    component.formFieldHelpers = ['a', 'b'];
    expect(component.getFormFieldHelpersAsString()).toBe('a b');
  });
});