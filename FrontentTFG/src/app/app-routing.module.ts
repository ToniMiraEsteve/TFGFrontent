import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InfoComponent } from './info/info.component';
import { NinyosComponent } from './ninyos/ninyos.component';
import { TabViewNinyoComponent } from './ninyos/tab-view-ninyo/tab-view-ninyo.component';
import { TabEditNinyoComponent } from './ninyos/tab-edit-ninyo/tab-edit-ninyo.component';
import { Rol } from './enums/rol.enum';
import { RoleGuard } from './general/guards/role.guard';
import { PdfsComponent } from './pdfs/pdfs.component';
import { CalendarioComponent } from './calendario/calendario.component';


const routes: Routes = [
  {path: '', redirectTo: '/info', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},

  {path: 'info', component: InfoComponent}, 
  {path: 'ninyos', component: NinyosComponent , data: { roles: [Rol.Admin, Rol.Junta] } , canActivate: [RoleGuard]}, 
  {path: 'ninyos/view', component: TabViewNinyoComponent,data: { roles: [Rol.Admin, Rol.Junta] } , canActivate: [RoleGuard], children: [
    {path: ':id', component: TabViewNinyoComponent}
  ]},
  {path: 'ninyos/edit', component: TabEditNinyoComponent,data: { roles: [Rol.Admin, Rol.Junta] } , canActivate: [RoleGuard], children: [
    {path: ':id', component: TabEditNinyoComponent}
  ]},

  {path: 'pdfs', component: PdfsComponent,data: { roles: [Rol.Admin] } , canActivate: [RoleGuard]},
  {path: 'eventos', component: CalendarioComponent,data: { roles: [Rol.Admin] } , canActivate: [RoleGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
