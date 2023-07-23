<?php
date_default_timezone_set('Asia/Bangkok');

// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     // The request is using the POST method
//     header("Access-Control-Allow-Origin: http://localhost:4200");
//     header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
//     header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// }

//if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//   $content = file_get_contents('php://input');
//   $dataFrm = json_decode($content, true);


  $hostAuth = "localhost";
  $userAuth = "root";
  $passAuth = "";
  $database = "studycheck";

  $link = new mysqli($hostAuth, $userAuth, $passAuth, $database);

  if ($link->connect_error) {
      die("Connection failed: " . $link->connect_error);
  } else {
      mysqli_set_charset($link, "utf8");
  }
//}

$regis_date = date('Y-m-d H:i:s');
$regis_mod = date('Y-m-d H:i:s');

$std_id = $_POST['std_id'];
$std_prefix = $_POST['std_prefix'];
$std_name = $_POST['std_name'];
$std_lastname = $_POST['std_lastname'];
$pro_id = $_POST['pro_id'];
$pro_name = $_POST['pro_name'];
$fac_id = $_POST['fac_id'];
$fac_name = $_POST['fac_name'];
$cap_type_id = $_POST['cap_type_id'];
$note = $_POST['note'];
$course_name = $_POST['course_name'];

$year = date('Y') + 543;

$uploadFolder = "../document/".$year;

// Create folder
$path = $uploadFolder.'/'.$std_id.'/';
if (!file_exists($path)) {
    mkdir($path, 0777, true);
}



$files = $_FILES['file_certificate']['name'];

for ($i = 0; $i < count($files); $i++) {
    $filename = $files[$i];
    $tmp = explode('.', $filename);
    $ext = end($tmp);
    $original = pathinfo($filename, PATHINFO_FILENAME);
    $fileurl = $std_id . "-" . date("YmdHis") . "." . $ext;
    move_uploaded_file($_FILES["file_certificate"]["tmp_name"][$i], $path . $fileurl);
}

$pathUrl = 'document/'.$year.'/'.$fileurl;

$fileurl = '';


$sql = "INSERT INTO capacity_student SET
    std_id = '$std_id',
    std_prefix = '$std_prefix',
    std_name = '$std_name',
    std_lastname = '$std_lastname',
    pro_id = '$pro_id',
    pro_name = '$pro_name',
    fac_id = '$fac_id',
    fac_name = '$fac_name',
    cap_type_id = '$cap_type_id',
    note = '',
    path_certificate = '$pathUrl',
    course_name = '$course_name',
    approv_status = '0'
    ";
 


if ($link->query($sql)) {
    $rows_regis = array();

    // Add $rows_regis to array
    $obj = new stdClass();
    $obj->std_id = $std_id;

    $rows_regis[] = $obj;
}

$data[] = array('resp'=>$sql);


header("Access-Control-Allow-Origin: http://localhost:4200");
header("content-type:text/javascript;charset=utf-8");
header("Content-Type: application/json; charset=utf-8", true, 200);

print json_encode(array("data"=>$data, 'rows'=>''));