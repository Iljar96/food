<?php 
//echo var_dump($_POST); //Наш response, который будет приходить с сервера
$_POST = json_decode(file_get_contents("php://input"), true); //Декодируем JSON
echo var_dump($_POST);

