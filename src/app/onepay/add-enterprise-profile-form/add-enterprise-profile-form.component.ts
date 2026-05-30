import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IEnterprise, IEnterpriseProfile } from '../model/enterprise.model';
import { Status } from '../model/core.enum';
import { EnterpriseProfileService } from '../services/enterprise-profile.service';
import { EnterpriseService } from '../services/enterprise.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-enterprise-profile-form',
  templateUrl: './add-enterprise-profile-form.component.html',
  styleUrl: './add-enterprise-profile-form.component.scss'
})
export class AddEnterpriseProfileFormComponent implements OnInit {

  formFieldHelpers: string[] = [''];
  adminForm!: FormGroup;
  enterprises: IEnterprise[] = [];

  constructor(
    private fb: FormBuilder,
    private enterpriseProfileService: EnterpriseProfileService,
    private enterpriseService: EnterpriseService
  ) { }

  onSubmit(): void {
    const formValue = this.adminForm.value;
    const selectedEnterprise = this.enterprises.find(e => e.id === formValue.enterprise);
    let enterpriseProfile: IEnterpriseProfile = { ...formValue };
    enterpriseProfile.enterprise = selectedEnterprise!;
    enterpriseProfile.status = Status.ACTIVE;
    this.enterpriseProfileService.createEnterpriseProfile(enterpriseProfile).subscribe({
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
    this.enterpriseService.getEnterprises().subscribe({
      next: (data) => {
        this.enterprises = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log('Error loading enterprises', err);
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
      enterprise: [''],
    });
  }

  getFormFieldHelpersAsString(): string {
    return this.formFieldHelpers.join(' ');
  }
}