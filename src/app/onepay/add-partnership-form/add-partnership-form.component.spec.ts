import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { AddPartnershipFormComponent } from './add-partnership-form.component';
import { PartnershipService } from '../services/partnership.service';
import { EnterpriseService } from '../services/enterprise.service';
import { SalesService } from '../services/sales.service';
import { IEnterprise } from '../model/enterprise.model';
import { ISales } from '../model/sales.model';
import { Modules, Status } from '../model/core.enum';

const mockEnterprises: IEnterprise[] = [
  { id: 1, name: 'Enterprise A' },
  { id: 2, name: 'Enterprise B' }
];
const mockSalesList: ISales[] = [
  { id: 1, name: 'Sales A', address: 'Dakar', type: Modules.RESTAURATION },
  { id: 2, name: 'Sales B', address: 'Thiès', type: Modules.MARKET }
];

describe('AddPartnershipFormComponent', () => {
  let component: AddPartnershipFormComponent;
  let fixture: ComponentFixture<AddPartnershipFormComponent>;
  let partnershipServiceSpy: jasmine.SpyObj<PartnershipService>;
  let enterpriseServiceSpy: jasmine.SpyObj<EnterpriseService>;
  let salesServiceSpy: jasmine.SpyObj<SalesService>;

  beforeEach(async () => {
    partnershipServiceSpy = jasmine.createSpyObj('PartnershipService', ['createPartnership']);
    enterpriseServiceSpy = jasmine.createSpyObj('EnterpriseService', ['getEnterprises']);
    salesServiceSpy = jasmine.createSpyObj('SalesService', ['getSales']);
    enterpriseServiceSpy.getEnterprises.and.returnValue(of(mockEnterprises));
    salesServiceSpy.getSales.and.returnValue(of(mockSalesList));

    await TestBed.configureTestingModule({
      declarations: [AddPartnershipFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: PartnershipService, useValue: partnershipServiceSpy },
        { provide: EnterpriseService, useValue: enterpriseServiceSpy },
        { provide: SalesService, useValue: salesServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPartnershipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load enterprises and sales on init', () => {
    expect(enterpriseServiceSpy.getEnterprises).toHaveBeenCalled();
    expect(salesServiceSpy.getSales).toHaveBeenCalled();
    expect(component.enterprises).toEqual(mockEnterprises);
    expect(component.salesList).toEqual(mockSalesList);
  });

  it('should keep enterprises empty on enterprise load error', () => {
    enterpriseServiceSpy.getEnterprises.and.returnValue(throwError(() => new Error('error')));
    salesServiceSpy.getSales.and.returnValue(of(mockSalesList));
    component.ngOnInit();
    expect(component.enterprises).toEqual(mockEnterprises);
    expect(component.salesList).toEqual(mockSalesList);
  });

  it('should keep salesList empty on sales load error', () => {
    enterpriseServiceSpy.getEnterprises.and.returnValue(of(mockEnterprises));
    salesServiceSpy.getSales.and.returnValue(throwError(() => new Error('error')));
    component.ngOnInit();
    expect(component.enterprises).toEqual(mockEnterprises);
    expect(component.salesList).toEqual(mockSalesList);
  });

  it('should submit with the selected enterprise and sales', () => {
    partnershipServiceSpy.createPartnership.and.returnValue(of({} as any));
    component.partnershipForm.setValue({
      enterprise: 1,
      sales: 2,
      status: Status.ACTIVE
    });

    component.onSubmit();

    const submitted = partnershipServiceSpy.createPartnership.calls.mostRecent().args[0];
    expect(submitted.enterprise).toEqual(mockEnterprises[0]);
    expect(submitted.sales).toEqual(mockSalesList[1]);
  });

  it('getFormFieldHelpersAsString should return joined string', () => {
    component.formFieldHelpers = ['p', 'q'];
    expect(component.getFormFieldHelpersAsString()).toBe('p q');
  });
});