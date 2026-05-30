import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ISales, ISalesProfile } from '../model/sales.model';
import { Status } from '../model/core.enum';
import { SalesProfileService } from '../services/sales-profile.service';
import { SalesService } from '../services/sales.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-sales-profile-form',
  templateUrl: './add-sales-profile-form.component.html',
  styleUrl: './add-sales-profile-form.component.scss'
})
export class AddSalesProfileFormComponent implements OnInit {

  formFieldHelpers: string[] = [''];
  adminForm!: FormGroup;
  salesList: ISales[] = [];

  constructor(
    private fb: FormBuilder,
    private salesProfileService: SalesProfileService,
    private salesService: SalesService
  ) { }

  onSubmit(): void {
    const formValue = this.adminForm.value;
    const selectedSales = this.salesList.find(s => s.id === formValue.sales);
    let salesProfile: ISalesProfile = { ...formValue };
    salesProfile.sales = selectedSales!;
    salesProfile.status = Status.ACTIVE;
    this.salesProfileService.createSalesProfile(salesProfile).subscribe({
      next: () => {
        console.log('Sended');
      },
      error: (err: HttpErrorResponse) => {
        console.log('Error', err);
      }
    });
  }

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

  private initializeForm(): void {
    this.adminForm = this.fb.group({
      lastname: [''],
      firstname: [''],
      username: [''],
      email: [''],
      phoneNumber: [''],
      role: [''],
      sales: [''],
    });
  }

  getFormFieldHelpersAsString(): string {
    return this.formFieldHelpers.join(' ');
  }
}