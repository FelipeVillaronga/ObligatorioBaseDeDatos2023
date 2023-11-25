import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MenuComponent } from './components/menu/menu.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { UpdatePeriodsComponent } from './components/update-periods/update-periods.component';
import {UpdateComponent} from "./components/update/update.component";
import { IndexComponent } from './components/index/index.component';


const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'menu/:id', component: MenuComponent },
  { path: 'schedule/:id', component: ScheduleComponent },
  { path: 'update-periods/:id', component: UpdatePeriodsComponent },
  { path: 'update/:id', component: UpdateComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
