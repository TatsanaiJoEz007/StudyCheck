<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json");


$hostAuth = "localhost";
$userAuth = "root";
$passAuth = "";
$database = "studycheck";

$link = new mysqli($hostAuth, $userAuth, $passAuth, $database);

// Change character set to utf8
$mysqli->set_charset("utf8");

if ($mysqli->connect_error) {
    die('Error : (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}
