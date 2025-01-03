import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Modules } from '../model/core.enum';
import { IEnterprise } from '../model/enterprise.model';
import { EnterpriseService } from '../services/enterprise.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-add-enterprise-form',
  templateUrl: './add-enterprise-form.component.html',
  styleUrl: './add-enterprise-form.component.scss',

})
export class AddEnterpriseFormComponent implements OnInit {
  formFieldHelpers: string[] = [''];
  enterpriseForm!: FormGroup;
  enrolledModules: Modules[] = [];
  enterprise: IEnterprise;
  readonly allModules: string[] = [Modules.RESTAURATION, Modules.MARKET, Modules.GAS_STATION, Modules.TELEPHONY];


  constructor(
    private fb: FormBuilder,
    private enterpriseService: EnterpriseService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  addModule(module: any) {
    this.enrolledModules.push(module)
  }
  
    onSubmit(): void {
      const formValue = this.enterpriseForm.value
      this.enterprise = {...formValue};
      this.enterprise.enrolledModules = this.enrolledModules
      console.log(this.enterprise);
      this.enterpriseService.createEnterprise(this.enterprise).subscribe({
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
      this.enterpriseForm = this.fb.group({
        name: [''],
        address: [''],
        maxQuota: [''],
        enrolledModules: ['']
      })
    }
}
