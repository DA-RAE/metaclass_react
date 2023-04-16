<?php
include 'db.php';

$table = $_POST['table'];
$value = $_POST['value'];

try {
    $sql = "INSERT INTO $table VALUES ($value)";
    $stmt = $connect->prepare($sql);
    $stmt->execute();
} catch (PDOException $e) {
    echo 'INSERT 실패 : ' . $e->getMessage();
}
