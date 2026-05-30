import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SalesConfigurationService } from '../services/sales-configuration.service';
import { SalesService } from '../services/sales.service';
import { ISales, ISalesConfiguration } from '../model/sales.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-sales-configuration-form',
  templateUrl: './add-sales-configuration-form.component.html',
  styleUrl: './add-sales-configuration-form.component.scss'
})
export class AddSalesConfigurationFormComponent implements OnInit {

  formFieldHelpers: string[] = [''];
  salesConfigurationForm!: FormGroup;
  salesList: ISales[] = [];

  constructor(
    private fb: FormBuilder,
    private salesConfigurationService: SalesConfigurationService,
    private salesService: SalesService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.salesService.getSales().subscribe({
      next: (data) => {
        this.salesList = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log('Error loading sales', err);
      }
    });
  }

  onSubmit(): void {
    const formValue = this.salesConfigurationForm.value;
    const selectedSales = this.salesList.find(s => s.id === formValue.sales);
    let salesConfiguration: ISalesConfiguration = { ...formValue };
    salesConfiguration.sales = selectedSales!;
    this.salesConfigurationService.createSalesConfiguration(salesConfiguration).subscribe({
      next: () => {
        console.log('Sended');
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  private initializeForm(): void {
    this.salesConfigurationForm = this.fb.group({
      sales: [''],
      maxAmount: [''],
      minAmount: [''],
    });
  }

  getFormFieldHelpersAsString(): string {
    return this.formFieldHelpers.join(' ');
  }
}