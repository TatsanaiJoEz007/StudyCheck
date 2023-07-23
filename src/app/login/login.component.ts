import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-home-student',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {    //กำหนดฟอร์ม frmLogin โดยใช้ FormBuilder ซึ่งประกอบด้วยสองฟิลด์คือ std_id และ std_password 
  frmLogin = this.formBuilder.group({             // โดยต้องมีการระบุ Validators ที่บังคับให้กรอกข้อมูลเสมอ
    std_id: ['', Validators.required],
    std_password: ['', Validators.required]
  });

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.http.post('http://localhost/studycheck/Api/login.php', this.frmLogin.value).subscribe({ //ส่งค่าจาก Form ไป ตรวจสอบกับ API Login ติดต่อไปยัง Api login.php
      next: (res: any) => {
        console.log('user ',res); // เเสดงค่าใน console

        if (res != 'Login failed') {  //หากเข้าสู่ระบบสำเร็จ
          this.getStudentData(res['std_id']); //รับค่า จำก std_id
          localStorage.setItem('Token', JSON.stringify(res)); //เเละเก็บค่าที่ respond ไว้ใน localStorage Key ชื่อ Token 
        } else {
          Swal.fire('เข้าสู่ระบบไม่สำเร็จ', '', 'error').then(() => {
            this.frmLogin.reset();
          });
        }
      }
    });
  }




getStudentData(studentId: string): void {

    this.http
      .get(`http://localhost/studycheck/Api/studentdata.php?std_id=${studentId}`) //ติดต่อไปยัง Api studentdata.php
      .subscribe((res: any) => { // ดึงข้อมูลในฟิลด์ std_prefix, std_name, std_lastname, std_phone, std_email
        const { std_prefix, std_name, std_lastname, std_phone, std_email } = res;
        this.router.navigate(['homestudent'], { // ส่งข้อมูลไปยังหน้า home-student
          state: {
            std_prefix,
            std_name,
            std_lastname,
            std_phone,
            std_email
          }
        });
      });
  }
}
