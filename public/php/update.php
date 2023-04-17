<?php
include 'db.php';

$table = $_POST['table'];
$value = $_POST['value'];
$id = $_POST['id'];

$bind = '';
foreach (array_keys($value) as $key) {
    $bind .= "$key = :$key, ";
}
$bind = substr($bind, 0, -2);
$idKey = key($id);

try {
    $sql = "UPDATE $table SET $bind WHERE $idKey = :$idKey";
    $stmt = $connect->prepare($sql);
    foreach (array_keys($value) as $key) {
        $stmt->bindValue(":$key", $value[$key], PDO::PARAM_STR);
    }
    $stmt->bindValue(":$idKey", $id[$idKey], PDO::PARAM_STR);
    $stmt->execute();
} catch (PDOException $e) {
    echo 'UPDATE 실패 : ' . $e->getMessage();
}
