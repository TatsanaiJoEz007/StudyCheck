<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');


// เชื่อมต่อกับฐานข้อมูล
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'studycheck';

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die('การเชื่อมต่อฐานข้อมูลล้มเหลว: ' . $conn->connect_error);
}

// รับค่า std_id จากคำขอ
$std_id = $_GET['std_id']; // หรือใช้ $_POST แล้วเปลี่ยนเป็น POST ในคำสั่ง SQL

// สร้างคำสั่ง SQL เพื่อดึงข้อมูลนักศึกษาจากฐานข้อมูล
$sql = "SELECT std_prefix, std_name, std_lastname, std_phone, std_email  FROM student WHERE std_id = '$std_id'";

// ดำเนินการส่งคำสั่ง SQL และรับผลลัพธ์
$result = $conn->query($sql);


// ตรวจสอบผลลัพธ์
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $studentData = [
        'std_prefix' => $row['std_prefix'],
        'std_name' => $row['std_name'],
        'std_lastname' => $row['std_lastname'],
        'std_phone' => $row['std_phone'],
        'std_email' => $row['std_email'],


    ];

    // แปลงข้อมูลเป็นรูปแบบ JSON และส่งกลับไปยังแอปพลิเคชัน Angular
    header('Content-Type: application/json');
    echo json_encode($studentData);
} else {
    // ถ้าไม่พบข้อมูลนักศึกษา
    echo 'ไม่พบข้อมูลนักศึกษา';
}



// ปิดการเชื่อมต่อฐานข้อมูล
$conn->close();

?>
