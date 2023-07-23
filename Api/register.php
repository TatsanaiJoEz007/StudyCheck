<?php
header("Access-Control-Allow-Origin:*");
header('Access-Control-Allow-Methods:*');
header('Access-Control-Allow-Headers:*');

if ($_SERVER ['REQURST_METHOD']==='POST'){

$content = file_get_contents('php://input');
$dataFrm = json_decode($content,true);

$std_id = $dataFrm['std_id'];
$std_password = $dataFrm['std_password'];

$hostAuth = "localhost";
$userAuth = "root";
$passAuth = "";
$database = "studycheck";


$link = new mysqli($hostAuth ,$userAuth ,$passAuth, $database);

if($link -> connect_error){
    die("connection failed : " . $link ->connect_error);
} else {
    mysqli_set_charset($link , "utf8");
}

$sql = "INSERT INTO student (std_id , std_password) VALUES ('$std_id' , '$std_password')";
if($link -> query($sql) === true) {
    echo json_encode('register success');
} else {
  echo json_encode('error query');
  return;
}
}
?>
