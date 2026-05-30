import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Modules, Status } from '../model/core.enum';
import { PartnershipService } from '../services/partnership.service';
import { IPartnership } from '../model/partnership.model';
import { HttpErrorResponse } from '@angular/common/http';
import { IEnterprise } from '../model/enterprise.model';
import { ISales } from '../model/sales.model';


@Component({
  selector: 'app-add-partnership-form',
  templateUrl: './add-partnership-form.component.html',
  styleUrl: './add-partnership-form.component.scss'
})
export class AddPartnershipFormComponent implements OnInit {

  formFieldHelpers: string[] = [''];
  partnershipForm: FormGroup;

  // TODO Mettre list entreprise =====================================
      selectedEnterprise: IEnterprise = {
        id: 1,
        ref: "string",
            name: "string",
            maxQuota: 10,
            actualQuota: 10,
            enrolledModules:[ Modules.RESTAURATION]
      };
// TODO Mettre list sales =================================
  selectedSales: ISales = {
    id: 1,
    ref: "string",
    name: "string",
    address:"string",
    type: Modules.RESTAURATION
  };


  constructor(
    private fb: FormBuilder,
    private partnershipService: PartnershipService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit(): void {
    const formValue = this.partnershipForm.value;
    let partnership: IPartnership = {...formValue};
    partnership.enterprise = this.selectedEnterprise;
    partnership.sales = this.selectedSales;
    
    this.partnershipService.createPartnership(partnership).subscribe({
      next: () => {
        console.log("Sended");
        
      },
      error: (err: HttpErrorResponse) => {
        console.log("Error");
        
      }
    })
  }

  private initializeForm(): void {
    this.partnershipForm = this.fb.group({
      enterprise: [''],
      sales: [''],
      status: ['']
    })
  }

  getFormFieldHelpersAsString(): string
  {
    return this.formFieldHelpers.join(' ');
  }

}
