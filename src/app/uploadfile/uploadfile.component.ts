import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-upload',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadComponent implements OnInit {
  selectedFiles: File[] = [];
  studentData: any;
  cap_type_id: any;
  course_name: string = '';
  note: any;

  regis: regisForm = {
    cap_type_id: 0,
    Note: '',
  };

  constructor(private http: HttpClient, private location: Location) {

  }

  ngOnInit(): void {
    this.getStudentData();

  }

  getStudentData(): void {

    const Token:any = localStorage.getItem('Token');
    this.studentData = JSON.parse(Token) //ให้ตัวเเปล studentData เท่ากับ ค่าจาก local storage ใน Key Token ที่อยู่ใน รูปเเบบ Json
    console.log ('stddata:, ',this.studentData); //เเสดงค่า studentData ใน console

  }

  onFileChange(event: any) {
    const files: FileList = event.target.files;
    this.selectedFiles = [];

    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }

    console.log(this.selectedFiles);
  }

  uploadFiles() {
    const formData = new FormData();


    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('file_certificate[]', this.selectedFiles[i]);
    }

    console.log(this.note);

    formData.append('std_id', this.studentData.std_id);
    formData.append('std_prefix', this.studentData.std_prefix);
    formData.append('std_name', this.studentData.std_name);
    formData.append('std_lastname', this.studentData.std_lastname);
    formData.append('pro_id', this.studentData.pro_id);
    formData.append('pro_name', this.studentData.pro_name);
    formData.append('fac_id', this.studentData.fac_id);
    formData.append('fac_name', this.studentData.fac_name);
    formData.append('note', this.note);
    //formData.append('course_name', this.course_name);
    formData.append('cap_type_id', this.cap_type_id);

    this.http.post('http://localhost/studycheck/Api/uploadfile.php', formData).subscribe(
      (response) => {
        Swal.fire('บันทึกข้อมูลสำเร็จ', '', 'success').then(() => {
          this.reloadPage();
        })
        console.log('Files uploaded successfully');
        console.log(response); // แสดงข้อมูลที่ส่งกลับมาจาก API
        // ทำการประมวลผลข้อมูลเพิ่มเติมตามต้องการ


      },
      (error) => {
        Swal.fire('บันทึกข้อมูลไม่สำเร็จ', '', 'error').then(() => {
          this.reloadPage();
        })
        console.log('Error uploading files');
        console.error(error); // แสดงข้อผิดพลาดที่เกิดขึ้น
        // ทำการจัดการข้อผิดพลาดตามต้องการ
      }
    );

  }

  clearFiles() {
    this.selectedFiles = [];
  }
  reloadPage() {
    this.location.go(this.location.path());
    window.location.reload();
  }
}

export interface regisForm {
  cap_type_id: Number;
  Note: String;
}
