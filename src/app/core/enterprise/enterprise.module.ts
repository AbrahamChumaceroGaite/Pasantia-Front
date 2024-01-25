import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableEnterpriseComponent } from './components/table-enterprise/table-enterprise.component';
import { CreateEditEnterpriseComponent } from './components/create-edit-enterprise/create-edit-enterprise.component';
import { EnterpriseRoutingModule } from './enterprise-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengLibraryModule } from 'src/app/frameworks/primeng-library.module';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { TableWaitListComponent } from './components/table-wait-list/table-wait-list.component';

@NgModule({
  declarations: [
    TableEnterpriseComponent,
    CreateEditEnterpriseComponent,
    ViewProfileComponent,
    TableWaitListComponent
  ],
  imports: [
    EnterpriseRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,    
    PrimengLibraryModule,
  ]
})
export class EnterpriseModule { }
