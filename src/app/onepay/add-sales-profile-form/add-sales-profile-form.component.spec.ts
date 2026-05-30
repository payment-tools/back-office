import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { AddSalesProfileFormComponent } from './add-sales-profile-form.component';
import { SalesProfileService } from '../services/sales-profile.service';
import { SalesService } from '../services/sales.service';
import { ISales } from '../model/sales.model';
import { Modules } from '../model/core.enum';

const mockSalesList: ISales[] = [
  { id: 1, name: 'Sales A', address: 'Dakar', type: Modules.RESTAURATION },
  { id: 2, name: 'Sales B', address: 'Thiès', type: Modules.MARKET }
];

describe('AddSalesProfileFormComponent', () => {
  let component: AddSalesProfileFormComponent;
  let fixture: ComponentFixture<AddSalesProfileFormComponent>;
  let salesProfileServiceSpy: jasmine.SpyObj<SalesProfileService>;
  let salesServiceSpy: jasmine.SpyObj<SalesService>;

  beforeEach(async () => {
    salesProfileServiceSpy = jasmine.createSpyObj('SalesProfileService', ['createSalesProfile']);
    salesServiceSpy = jasmine.createSpyObj('SalesService', ['getSales']);
    salesServiceSpy.getSales.and.returnValue(of(mockSalesList));

    await TestBed.configureTestingModule({
      declarations: [AddSalesProfileFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: SalesProfileService, useValue: salesProfileServiceSpy },
        { provide: SalesService, useValue: salesServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSalesProfileFormComponent);
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
    salesProfileServiceSpy.createSalesProfile.and.returnValue(of({} as any));
    component.adminForm.setValue({
      lastname: 'Ndiaye',
      firstname: 'Moussa',
      username: 'mndiaye',
      email: 'mndiaye@test.com',
      phoneNumber: '0700000001',
      role: 'SALES_FINANCE',
      sales: 1
    });

    component.onSubmit();

    const submitted = salesProfileServiceSpy.createSalesProfile.calls.mostRecent().args[0];
    expect(submitted.sales).toEqual(mockSalesList[0]);
  });

  it('getFormFieldHelpersAsString should return joined string', () => {
    component.formFieldHelpers = ['x', 'y'];
    expect(component.getFormFieldHelpersAsString()).toBe('x y');
  });
});