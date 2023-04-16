<?php
include 'db.php';

$table = $_POST['table'];
$idColumn = $_POST['idColumn'];
$idValue = $_POST['idValue'];

try {
    $sql = "DELETE FROM $table WHERE $idColumn = $idValue";
    $stmt = $connect->prepare($sql);
    $stmt->execute();
} catch (PDOException $e) {
    echo 'DELETE 실패 : ' . $e->getMessage();
}
