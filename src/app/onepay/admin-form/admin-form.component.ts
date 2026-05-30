import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../services/admin-service';
import { EnterpriseService } from '../services/enterprise.service';
import { IEnterprise, IEnterpriseProfile } from '../model/enterprise.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Status } from '../model/core.enum';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrl: './admin-form.component.scss'
})

export class AdminFormComponent implements OnInit {

  formFieldHelpers: string[] = [''];
  adminForm!: FormGroup;
  enterprises: IEnterprise[] = [];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private enterpriseService: EnterpriseService
  ) { }

  onSubmit(): void {
    const formValue = this.adminForm.value;
    const selectedEnterprise = this.enterprises.find(e => e.id === formValue.enterprise);
    let enterpriseProfile: IEnterpriseProfile = { ...formValue };
    enterpriseProfile.enterprise = selectedEnterprise!;
    enterpriseProfile.status = Status.ACTIVE;
    this.adminService.createEnterpriseAdmin(enterpriseProfile).subscribe({
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
