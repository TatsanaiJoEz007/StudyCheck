<?php
date_default_timezone_set('Asia/Bangkok');
// header("Access-Control-Allow-Origin: http://localhost:4200");
// header('Access-Control-Allow-Methods: POST');
// header('Access-Control-Allow-Headers: Content-Type');



// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     // The request is using the POST method
//     header("Access-Control-Allow-Origin: http://localhost:4200");
//     header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
//     header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // $content = file_get_contents('php://input');
  // $dataFrm = json_decode($content, true);


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
}


  $user_email = $_POST['user_email'];
  $user_password = $_POST['user_password'];
  $user_name = $_POST['user_name'];
  $user_lastname = $_POST['user_lastname'];
  $user_role = $_POST['user_role'];
  $fac_id = $_POST['fac_id'];



  $sql = "INSERT INTO users SET
    user_email = '$user_email',
    user_password = '$user_password',
    user_name =  '$user_name',
    user_lastname = '$user_lastname',
    user_role = '$user_role',
    fac_id = '$fac_id'
     ";



if ($link->query($sql)) {
  $rows_regis = array();

  // Add $rows_regis to array
  $obj = new stdClass();
  $obj->status = 'succsess';

  $rows_regis[] = $obj;
}

$data[] = array('resp'=>$rows_regis);






header("Access-Control-Allow-Origin: *");
header("content-type:text/javascript;charset=utf-8");
header("Content-Type: application/json; charset=utf-8", true, 200);

print json_encode(array("data"=>$data, 'rows'=>''));



?>
