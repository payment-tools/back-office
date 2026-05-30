import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PartnershipService } from '../services/partnership.service';
import { EnterpriseService } from '../services/enterprise.service';
import { SalesService } from '../services/sales.service';
import { IPartnership } from '../model/partnership.model';
import { IEnterprise } from '../model/enterprise.model';
import { ISales } from '../model/sales.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-partnership-form',
  templateUrl: './add-partnership-form.component.html',
  styleUrl: './add-partnership-form.component.scss'
})
export class AddPartnershipFormComponent implements OnInit {

  formFieldHelpers: string[] = [''];
  partnershipForm!: FormGroup;
  enterprises: IEnterprise[] = [];
  salesList: ISales[] = [];

  constructor(
    private fb: FormBuilder,
    private partnershipService: PartnershipService,
    private enterpriseService: EnterpriseService,
    private salesService: SalesService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.enterpriseService.getEnterprises().subscribe({
      next: (data) => {
        this.enterprises = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log('Error loading enterprises', err);
      }
    });
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
    const formValue = this.partnershipForm.value;
    const selectedEnterprise = this.enterprises.find(e => e.id === formValue.enterprise);
    const selectedSales = this.salesList.find(s => s.id === formValue.sales);
    let partnership: IPartnership = { ...formValue };
    partnership.enterprise = selectedEnterprise!;
    partnership.sales = selectedSales!;
    this.partnershipService.createPartnership(partnership).subscribe({
      next: () => {
        console.log('Sended');
      },
      error: (err: HttpErrorResponse) => {
        console.log('Error', err);
      }
    });
  }

  private initializeForm(): void {
    this.partnershipForm = this.fb.group({
      enterprise: [''],
      sales: [''],
      status: [''],
    });
  }

  getFormFieldHelpersAsString(): string {
    return this.formFieldHelpers.join(' ');
  }
}