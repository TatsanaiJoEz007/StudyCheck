import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-masteradmin',
  templateUrl: './masteradmin.component.html',
  styleUrls: ['./masteradmin.component.css']
})
export class MasteradminComponent implements OnInit {
  user_email: any;
  user_password: any;
  user_name: any;
  user_lastname: any;
  user_role: any;
  fac_id: any;


  userData : any;
  userlist: any;

  regis: regisUser = {
    user_id: 0,
    user_email: '',
    user_password: '',
    user_name: '',
    user_lastname: '',
    user_role: '',
    fac_id: 0,
  }

  constructor(private http: HttpClient, private location: Location) {

  }

  ngOnInit(): void {
    this.getUserData();
    this.getuserlist();



  }

  getUserData(): void {

    const Token:any = localStorage.getItem('Token');
    this.userData = JSON.parse(Token) //ให้ตัวเเปล studentData เท่ากับ ค่าจาก local storage ใน Key Token ที่อยู่ใน รูปเเบบ Json
    console.log ('userdata:, ',this.userData); //เเสดงค่า studentData ใน console
  }















  adduser(){
    const formUserData = new FormData();

    formUserData.append('user_email', this.user_email);
    formUserData.append('user_password', this.user_password);
    formUserData.append('user_name', this.user_name);
    formUserData.append('user_lastname', this.user_lastname);
    formUserData.append('user_role', this.user_role);
    formUserData.append('fac_id', this.fac_id);

    console.log('test adduser', formUserData);

    this.http.post('http://localhost/studycheck/Api/adduser.php', formUserData).subscribe(
      (response) => {
        Swal.fire('เพิ่มผู้ใช้สำเร็จ', '', 'success').then(() => {
          //this.reloadPage(); //ทำการรีโหลดหน้า Web
        })
        console.log('adduser successfully');
        console.log(response); // แสดงข้อมูลที่ส่งกลับมาจาก API
      },
      (error) => {
        Swal.fire('เพิ่มผู้ใช้ไม่สำเร็จ', '', 'error').then(() => {
          //this.reloadPage(); //ทำการรีโหลดหน้า Web
        })
        console.log('Error adduser');

      }
    );

  }

  reloadPage() {
    this.location.go(this.location.path());
    window.location.reload();
  }

  getuserlist(): void {

    this.http
      .get(`http://localhost/studycheck/Api/getdatausers.php`) //ติดต่อไปยัง Api studentdata.php
      .subscribe((res: any) => { // ดึงข้อมูลในฟิลด์ std_prefix, std_name, std_lastname, std_phone, std_email
        this.userlist = res.data;
        console.log('userdata: ', this.userlist)

      });
  }

  editShowData(item:any) {
    console.log(item);
    this.regis = item;

    // this.user_email = item.user_email;
    // this.user_password= item.user_password;
    // this.user_name= item.user_name;
    // this.user_lastname= item.user_lastname;
    // this.user_role= item.user_role;
    // this.fac_id= item.fac_id;
  }

  }

  export interface regisUser {
    user_id:Number;
    user_email:String;
    user_password:String;
    user_name:String;
    user_lastname: String;
    user_role: String;
    fac_id: Number;
  }



