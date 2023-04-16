<?php
include 'db.php';

$table = $_POST['table'];
$idColumn = $_POST['idColumn'];
$idValue = $_POST['idValue'];
$column = $_POST['column'];
$value = $_POST['value'];

try {
    $sql = "UPDATE $table SET $column = $value WHERE $idColumn = $idValue";
    $stmt = $connect->prepare($sql);
    $stmt->execute();
} catch (PDOException $e) {
    echo 'UPDATE 실패 : ' . $e->getMessage();
}
