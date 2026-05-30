import { Route, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatChipsModule } from "@angular/material/chips";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatLuxonDateModule } from "@angular/material-luxon-adapter";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { FuseHighlightModule } from "@fuse/components/highlight";
import { SharedModule } from "app/shared/shared.module";

import { AddSalesConfigurationFormComponent } from "./add-sales-configuration-form.component";

export const routes: Route[] = [
    {
        path     : '',
        component: AddSalesConfigurationFormComponent
    }
];

@NgModule({
    declarations: [
        AddSalesConfigurationFormComponent
    ],
    imports : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatLuxonDateModule,
        MatMenuModule,
        MatSelectModule,
        FuseHighlightModule,
        SharedModule
        ]
})
export class AddSalesConfigurationFormModule {

}