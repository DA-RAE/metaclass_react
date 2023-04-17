<?php
include 'db.php';

$table = $_POST['table'];
$id = $_POST['id'];

$idKey = key($id);

try {
    $sql = "DELETE FROM $table WHERE $idKey = :$idKey";
    $stmt = $connect->prepare($sql);
    $stmt->bindValue(":$idKey", $id[$idKey], PDO::PARAM_STR);
    $stmt->execute();
} catch (PDOException $e) {
    echo 'DELETE 실패 : ' . $e->getMessage();
}
