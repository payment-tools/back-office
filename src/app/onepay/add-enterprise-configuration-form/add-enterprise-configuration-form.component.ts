import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IEnterprise } from '../model/enterprise.model';
import { Modules } from '../model/core.enum';
import { EnterpriseConfigurationService } from '../services/enterprise-configuration.service';
import { IEnterpriseConfiguration } from '../model/enterprise-configuration.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-enterprise-configuration-form',
  templateUrl: './add-enterprise-configuration-form.component.html',
  styleUrl: './add-enterprise-configuration-form.component.scss'
})
export class AddEnterpriseConfigurationFormComponent implements OnInit{

  formFieldHelpers: string[] = [''];
  enterpriseConfigurationForm: FormGroup;
  // TODO Mettre entreprise par défaut ==============================
      selectedEnterprise: IEnterprise = {
        id: 1,
        ref: "string",
            name: "string",
            maxQuota: 10,
            actualQuota: 10,
            enrolledModules:[ Modules.RESTAURATION]
      };
  constructor (
    private fb: FormBuilder,
    private enterpriseConfigurationService: EnterpriseConfigurationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit(): void {
    const formValue = this.enterpriseConfigurationForm.value;
    let enterpriseConfiguration: IEnterpriseConfiguration = {...formValue};
    enterpriseConfiguration.enterprise = this.selectedEnterprise;

    this.enterpriseConfigurationService.createEnterpriseConfiguration(enterpriseConfiguration).subscribe({
      next: () => {
        console.log('Sended');
        
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        
      }
    })
    
  }

  private initializeForm(): void {
    this.enterpriseConfigurationForm = this.fb.group({
      enterprise: [''],
      maxAmountRestauration: [''],
      maxAmountMarket: [''],
      maxAmountGasStation: [''],
      maxAmountTelephony: [''],
      enterprisePercentage: [''],
      employeePercentage: ['']
    })
  }

  getFormFieldHelpersAsString(): string {
    return this.formFieldHelpers.join(' ');
  }

}
