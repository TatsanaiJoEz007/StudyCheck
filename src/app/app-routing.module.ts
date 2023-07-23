import { UploadComponent } from './uploadfile/uploadfile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeStudentComponent } from './home-student/home-student.component';
import { LoginComponent } from './login/login.component';
import { FaculutyWebManagementComponent } from './faculuty-web-management/faculuty-web-management.component';
import { MasteradminComponent } from './masteradmin/masteradmin.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { SelectloginComponent } from './selectlogin/selectlogin.component';
import { LogoutComponent } from './logout/logout.component';



const routes: Routes = [
  { path: 'homestudent', component: HomeStudentComponent }, // route ไปหน้าหลักของนักศึกษา
  { path: 'uploadfile' , component : UploadComponent}, // route ไปหน้าของอัพโหลดเอกสาร
  { path : 'selectlogin' , component : SelectloginComponent}, // route ไปหน้าเลือกการ Login
  { path: 'login', component: LoginComponent }, // route ไปการ Login ของนักศึกษา
  { path : 'adminlogin' , component : AdminloginComponent}, // route ไปการ Login ของ คณะเเละกองพัฒ
  { path: 'fmanagement' ,component:FaculutyWebManagementComponent}, // route ไปหน้าหลักคณะ
  { path : 'logout' , component: LogoutComponent },
  { path: 'masteradmin', component: MasteradminComponent }, // route ไปหน้าหลักกองพัฒ
  { path : 'adduser' , component : AdduserComponent}, // route ไปหน้าเพิ่ม user ของกองพัฒ
  { path: '**', redirectTo:'/selectlogin' }, // หากใส่ url ไม่ถูกต้องจะทำการ Redirect ไป หน้าเลือกการ Login 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
