import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ISales, ISalesProfile } from '../model/sales.model';
import { Modules, Status } from '../model/core.enum';
import { AdminService } from '../services/admin-service';
import { HttpErrorResponse } from '@angular/common/http';
import { SalesProfileService } from '../services/sales-profile.service';

@Component({
  selector: 'app-add-sales-profile-form',
  templateUrl: './add-sales-profile-form.component.html',
  styleUrl: './add-sales-profile-form.component.scss'
})
export class AddSalesProfileFormComponent {

formFieldHelpers: string[] = [''];
  adminForm!: FormGroup;
  // TODO Mettre list sales 
  selectedSales: ISales = {
    id: 1,
    ref: "string",
    name: "string",
    address:"string",
    type: Modules.RESTAURATION
  };

  constructor(
    private fb: FormBuilder,
    private salesProfileService: SalesProfileService
  ){ }

  onSubmit(): void {
    console.log(this.adminForm);
    const formValue = this.adminForm.value;
    let salesProfile: ISalesProfile = {...formValue}
    //TODO enlever valeur en dur
    salesProfile.sales = this.selectedSales;
    salesProfile.status = Status.ACTIVE;
    this.salesProfileService.createSalesProfile(salesProfile).subscribe({
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
      sales: ['']
    })
  }

  getFormFieldHelpersAsString(): string
    {
        return this.formFieldHelpers.join(' ');
    }
}
