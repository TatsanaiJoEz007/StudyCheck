import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faculuty-web-management',
  templateUrl: './faculuty-web-management.component.html',
  styleUrls: ['./faculuty-web-management.component.css']
})
export class FaculutyWebManagementComponent {
  userData: any;
  capData: any;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    const Token:any = localStorage.getItem('Token');
    this.userData = JSON.parse(Token) //ให้ตัวเเปล studentData เท่ากับ ค่าจาก local storage ใน Key Token ที่อยู่ใน รูปเเบบ Json
     console.log (this.userData); //เเสดงค่า studentData ใน console

     this.getuserData(this.userData.fac_id)
  }








  getuserData(Id: string): void {

    this.http
      .get(`http://localhost/studycheck/Api/getdatacap.php?fac_id=${Id}`) //ติดต่อไปยัง Api studentdata.php
      .subscribe((res: any) => { // ดึงข้อมูลในฟิลด์ std_prefix, std_name, std_lastname, std_phone, std_email
        this.capData = res;
        console.log('cap data: ', this.capData)
     
      });
  }
}





