import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IEnterprise, IEnterpriseProfile } from '../model/enterprise.model';
import { Modules, Status } from '../model/core.enum';
import { AdminService } from '../services/admin-service';
import { HttpErrorResponse } from '@angular/common/http';
import { EnterpriseProfileService } from '../services/enterprise-profile.service';

@Component({
  selector: 'app-add-enterprise-profile-form',
  templateUrl: './add-enterprise-profile-form.component.html',
  styleUrl: './add-enterprise-profile-form.component.scss'
})
export class AddEnterpriseProfileFormComponent {

  formFieldHelpers: string[] = [''];
    adminForm!: FormGroup;
    // TODO Mettre list entreprise 
    selectedEnterprise: IEnterprise = {
      id: 1,
      ref: "string",
          name: "string",
          maxQuota: 10,
          actualQuota: 10,
          enrolledModules:[ Modules.RESTAURATION]
    };
  
    constructor(
      private fb: FormBuilder,
      private enterpriseProfileService: EnterpriseProfileService
    ){ }
  
    onSubmit(): void {
      console.log(this.adminForm);
      const formValue = this.adminForm.value;
      let enterpriseProfile: IEnterpriseProfile = {...formValue}
      //TODO enlever valeur en dur
      enterpriseProfile.enterprise = this.selectedEnterprise;
      enterpriseProfile.status = Status.ACTIVE;
      this.enterpriseProfileService.createEnterpriseProfile(enterpriseProfile).subscribe({
        next: () => {
          console.log("Sended");
          
        },
        error: (err: HttpErrorResponse) => {
          console.log("Error");
          
        } 
      })
    }
  
    ngOnInit(): void {
      this.initializeForm()
    }
  
    private initializeForm(): void {
      this.adminForm = this.fb.group({
        lastname: [''],
        firstname: [''],
        username: [''],
        email: [''],
        phoneNumber: [''],
        role: [''],
        enterprise: [''],
        //sales: ['']
      })
    }
  
    getFormFieldHelpersAsString(): string
      {
          return this.formFieldHelpers.join(' ');
      }

}
