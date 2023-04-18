<?php

$db_host = 'localhost';
$db_name = 'metaclass';
$db_user = 'root';
$db_password = 'darae4957';

$connect = new PDO("mysql:host=$db_host; dbname=$db_name; charset=utf8mb4", $db_user, $db_password);
$connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
