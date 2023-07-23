import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeStudentComponent } from './home-student/home-student.component';
import { LoginComponent } from './login/login.component';
import { FaculutyWebManagementComponent } from './faculuty-web-management/faculuty-web-management.component';
import { MasteradminComponent } from './masteradmin/masteradmin.component';
import { UploadComponent } from './uploadfile/uploadfile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { SelectloginComponent } from './selectlogin/selectlogin.component';
import { LogoutComponent } from './logout/logout.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeStudentComponent,
    LoginComponent,
    FaculutyWebManagementComponent,
    MasteradminComponent,
    UploadComponent,
    NavbarComponent,
    RegisterComponent,
    AdduserComponent,
    AdminloginComponent,
    SelectloginComponent,
    LogoutComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule ,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
