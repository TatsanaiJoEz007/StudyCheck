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
//$fac_id = $_GET['fac_id']; // หรือใช้ $_POST แล้วเปลี่ยนเป็น POST ในคำสั่ง SQL

// สร้างคำสั่ง SQL เพื่อดึงข้อมูลนักศึกษาจากฐานข้อมูล
$sql = "SELECT * FROM  users u
INNER JOIN faculty f ON u.fac_id=f.fac_id
WHERE u.status = 1 ";

// ดำเนินการส่งคำสั่ง SQL และรับผลลัพธ์
$result = $conn->query($sql);


// ตรวจสอบผลลัพธ์
if ($result->num_rows > 0) {

   while( $row = $result->fetch_assoc()){
    $data[] = array(
        'user_email' => $row['user_email'],
        'user_password' => $row['user_password'],
        'user_name' => $row['user_name'],
        'user_lastname' => $row['user_lastname'],
        'user_role' => $row['user_role'],
        'fac_id' => $row['fac_id'],
        'fac_name' => $row['fac_name'],
    );
   }
    // แปลงข้อมูลเป็นรูปแบบ JSON และส่งกลับไปยังแอปพลิเคชัน Angular
    header('Content-Type: application/json');
    echo json_encode(array('data'=>$data, 'row'=>''));
} else {
    // ถ้าไม่พบข้อมูลนักศึกษา
    echo 'ไม่พบข้อมูลนักศึกษา';
}



// ปิดการเชื่อมต่อฐานข้อมูล
$conn->close();

?>
