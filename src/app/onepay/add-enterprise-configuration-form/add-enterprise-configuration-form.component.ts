import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IEnterprise } from '../model/enterprise.model';
import { EnterpriseConfigurationService } from '../services/enterprise-configuration.service';
import { EnterpriseService } from '../services/enterprise.service';
import { IEnterpriseConfiguration } from '../model/enterprise-configuration.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-enterprise-configuration-form',
  templateUrl: './add-enterprise-configuration-form.component.html',
  styleUrl: './add-enterprise-configuration-form.component.scss'
})
export class AddEnterpriseConfigurationFormComponent implements OnInit {

  formFieldHelpers: string[] = [''];
  enterpriseConfigurationForm!: FormGroup;
  enterprises: IEnterprise[] = [];

  constructor(
    private fb: FormBuilder,
    private enterpriseConfigurationService: EnterpriseConfigurationService,
    private enterpriseService: EnterpriseService
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
  }

  onSubmit(): void {
    const formValue = this.enterpriseConfigurationForm.value;
    const selectedEnterprise = this.enterprises.find(e => e.id === formValue.enterprise);
    let enterpriseConfiguration: IEnterpriseConfiguration = { ...formValue };
    enterpriseConfiguration.enterprise = selectedEnterprise!;
    this.enterpriseConfigurationService.createEnterpriseConfiguration(enterpriseConfiguration).subscribe({
      next: () => {
        console.log('Sended');
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  private initializeForm(): void {
    this.enterpriseConfigurationForm = this.fb.group({
      enterprise: [''],
      maxAmountRestauration: [''],
      maxAmountMarket: [''],
      maxAmountGasStation: [''],
      maxAmountTelephony: [''],
      enterprisePercentage: [''],
      employeePercentage: [''],
    });
  }

  getFormFieldHelpersAsString(): string {
    return this.formFieldHelpers.join(' ');
  }
}