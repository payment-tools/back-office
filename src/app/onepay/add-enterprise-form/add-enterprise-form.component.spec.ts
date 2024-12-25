import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnterpriseFormComponent } from './add-enterprise-form.component';

describe('AddEnterpriseFormComponent', () => {
  let component: AddEnterpriseFormComponent;
  let fixture: ComponentFixture<AddEnterpriseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEnterpriseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEnterpriseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
