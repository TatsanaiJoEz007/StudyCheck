import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.css']
})
export class HomeStudentComponent implements OnInit {
  studentData: any;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.getStudentData();

  }

  getStudentData(): void {

  const Token:any = localStorage.getItem('Token');
  this.studentData = JSON.parse(Token) //ให้ตัวเเปล studentData เท่ากับ ค่าจาก local storage ใน Key Token ที่อยู่ใน รูปเเบบ Json
  console.log (this.studentData); //เเสดงค่า studentData ใน console

}
}
