import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InfoComponent } from './info/info.component';
import { NinyosComponent } from './ninyos/ninyos.component';
import { TabViewNinyoComponent } from './ninyos/tab-view-ninyo/tab-view-ninyo.component';


const routes: Routes = [
  {path: '', redirectTo: '/info', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},

  {path: 'info', component: InfoComponent },
  {path: 'ninyos', component: NinyosComponent }, 
  {path: 'ninyos/view/:id', component: TabViewNinyoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
