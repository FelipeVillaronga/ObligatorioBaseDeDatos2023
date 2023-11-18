import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { ScheduleComponent } from './components/schedule/schedule.component';

import { UpdatePeriodsComponent } from './components/update-periods/update-periods.component';
import {UpdateComponent} from "./components/update/update.component";


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'schedule', component: ScheduleComponent },

  { path: 'update-periods', component: UpdatePeriodsComponent },
  { path: 'update', component: UpdateComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
