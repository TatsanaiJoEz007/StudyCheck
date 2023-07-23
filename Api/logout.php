<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// include 'database.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // ตรวจสอบเมื่อมีการส่งคำขอตัวอย่างสำหรับตรวจสอบ CORS
    // ตอบกลับเฉพาะ header และส่งออกจากไฟล์นี้เท่านั้น
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $content = file_get_contents('php://input');
    $dataFrm = json_decode($content, true);

    // เพิ่มเงื่อนไขสำหรับการตรวจสอบการยืนยันตัวตน
    //if (/* เงื่อนไขการยืนยันตัวตน */) {
        // ตัดการเชื่อมต่อของผู้ใช้
        // ล้างข้อมูลเซสชัน หรือยกเลิกโทเค็นการเข้าสู่ระบบอื่น ๆ
        session_start();
        session_destroy();

        echo json_encode('Logout success');
    } else {
        echo json_encode('Logout failed');
    }
//}
?>
