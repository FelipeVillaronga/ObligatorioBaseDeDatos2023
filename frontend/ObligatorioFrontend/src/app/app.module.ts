import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { UpdatePeriodsComponent } from './components/update-periods/update-periods.component';
import { UpdateComponent } from './components/update/update.component';
import { IndexComponent } from './components/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ScheduleComponent,
    UpdatePeriodsComponent,
    UpdateComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
