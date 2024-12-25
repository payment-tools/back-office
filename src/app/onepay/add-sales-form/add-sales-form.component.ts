import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Modules } from '../model/core.enum';
import { ISales } from '../model/sales.model';
import { SalesService } from '../services/sales.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-sales-form',
  templateUrl: './add-sales-form.component.html',
  styleUrl: './add-sales-form.component.scss'
})
export class AddSalesFormComponent implements OnInit {

  formFieldHelpers: string[] = [''];
  salesForm!: FormGroup;
  modules = Modules;
  sales: ISales
  constructor(
    private fb: FormBuilder,
    private salesService: SalesService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit(): void {
    console.log(this.salesForm);
    const formValue = this.salesForm.value
    this.sales = {...formValue}
    this.salesService.createSales(this.sales).subscribe({
      next: () => {
        console.log("Sended");
        
      },
      error: (err: HttpErrorResponse) => {
        console.log("Error");
        
      }
    })
  }

  getFormFieldHelpersAsString(): string
  {
      return this.formFieldHelpers.join(' ');
  }

  private initializeForm(): void {
    this.salesForm = this.fb.group({
      name: [''],
      address: [''],
      type: ['']
    })
  }
}
