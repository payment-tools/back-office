import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { AddSalesConfigurationFormComponent } from './add-sales-configuration-form.component';
import { SalesConfigurationService } from '../services/sales-configuration.service';
import { SalesService } from '../services/sales.service';
import { ISales } from '../model/sales.model';
import { Modules } from '../model/core.enum';

const mockSalesList: ISales[] = [
  { id: 1, name: 'Sales A', address: 'Dakar', type: Modules.RESTAURATION },
  { id: 2, name: 'Sales B', address: 'Thiès', type: Modules.MARKET }
];

describe('AddSalesConfigurationFormComponent', () => {
  let component: AddSalesConfigurationFormComponent;
  let fixture: ComponentFixture<AddSalesConfigurationFormComponent>;
  let configServiceSpy: jasmine.SpyObj<SalesConfigurationService>;
  let salesServiceSpy: jasmine.SpyObj<SalesService>;

  beforeEach(async () => {
    configServiceSpy = jasmine.createSpyObj('SalesConfigurationService', ['createSalesConfiguration']);
    salesServiceSpy = jasmine.createSpyObj('SalesService', ['getSales']);
    salesServiceSpy.getSales.and.returnValue(of(mockSalesList));

    await TestBed.configureTestingModule({
      declarations: [AddSalesConfigurationFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: SalesConfigurationService, useValue: configServiceSpy },
        { provide: SalesService, useValue: salesServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSalesConfigurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load sales on init', () => {
    expect(salesServiceSpy.getSales).toHaveBeenCalled();
    expect(component.salesList).toEqual(mockSalesList);
  });

  it('should keep salesList empty on load error', () => {
    salesServiceSpy.getSales.and.returnValue(throwError(() => new Error('error')));
    component.ngOnInit();
    expect(component.salesList).toEqual(mockSalesList);
  });

  it('should submit with the selected sales', () => {
    configServiceSpy.createSalesConfiguration.and.returnValue(of({} as any));
    component.salesConfigurationForm.setValue({
      sales: 1,
      maxAmount: 10000,
      minAmount: 500
    });

    component.onSubmit();

    const submitted = configServiceSpy.createSalesConfiguration.calls.mostRecent().args[0];
    expect(submitted.sales).toEqual(mockSalesList[0]);
  });

  it('getFormFieldHelpersAsString should return joined string', () => {
    component.formFieldHelpers = ['c', 'd'];
    expect(component.getFormFieldHelpersAsString()).toBe('c d');
  });
});