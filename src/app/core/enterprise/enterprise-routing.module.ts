import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableEnterpriseComponent } from './components/table-enterprise/table-enterprise.component';

const routes: Routes = [
  { path: 'list/enterprises', component: TableEnterpriseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnterpriseRoutingModule { }
