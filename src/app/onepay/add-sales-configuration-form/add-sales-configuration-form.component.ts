import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SalesConfigurationService } from '../services/sales-configuration.service';
import { ISales, ISalesConfiguration } from '../model/sales.model';
import { Modules } from '../model/core.enum';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-sales-configuration-form',
  templateUrl: './add-sales-configuration-form.component.html',
  styleUrl: './add-sales-configuration-form.component.scss'
})
export class AddSalesConfigurationFormComponent implements OnInit{

  formFieldHelpers: string[] = [''];
  salesConfigurationForm: FormGroup;
  // TODO Mettre sales par défaut ==============================
  selectedsales: ISales = {
    id: 1,
    ref: "string",
    name: "string",
    type: Modules.RESTAURATION,
    address:"string"
  };

  constructor(
    private fb: FormBuilder,
    private salesConfigurationService: SalesConfigurationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.salesConfigurationForm = this.fb.group({
      sales: [''],
      maxAmount: [''],
      minAmount: [''],
      
    })
  }
  onSubmit(): void {
    const formValue = this.salesConfigurationForm.value;
    let salesConfiguration: ISalesConfiguration = {...formValue};
    salesConfiguration.sales = this.selectedsales;
    
    this.salesConfigurationService.createSalesConfiguration(salesConfiguration).subscribe({
      next: () => {
        console.log('Sended');
        
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        
      }
    })
    
  }
  getFormFieldHelpersAsString(): string {
    return this.formFieldHelpers.join(' ');
  }
}
