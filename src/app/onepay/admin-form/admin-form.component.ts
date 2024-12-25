import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../services/admin-service';
import { IEnterprise, IEnterpriseProfile } from '../model/enterprise.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Modules, Status } from '../model/core.enum';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrl: './admin-form.component.scss'
})

export class AdminFormComponent implements OnInit{

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
    private adminService: AdminService
  ){ }

  onSubmit(): void {
    console.log(this.adminForm);
    const formValue = this.adminForm.value;
    let enterpriseProfile: IEnterpriseProfile = {...formValue}
    //TODO enlever valeur en dur
    enterpriseProfile.enterprise = this.selectedEnterprise;
    enterpriseProfile.status = Status.ACTIVE;
    this.adminService.createEnterpriseAdmin(enterpriseProfile).subscribe({
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
