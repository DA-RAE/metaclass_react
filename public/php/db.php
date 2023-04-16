<?php

$db_host = 'localhost';
$db_name = 'metaclass';
$db_user = 'root';
$db_password = 'darae4957';

try {
    $connect = new PDO("mysql:host=$db_host; dbname=$db_name; charset=utf8mb4", $db_user, $db_password);
    $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'DB 연결 실패 : ' . $e->getMessage();
}
