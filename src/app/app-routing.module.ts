import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './core/layout/canva/app.layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'enterprise', loadChildren: () => import('./core/enterprise/enterprise.module').then(m => m.EnterpriseModule) },
    ]
  },
  { path: '', redirectTo: 'enterprise/list/enterprises', pathMatch: 'full' },
  { path: '**', redirectTo: 'enterprise/list/enterprises' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
