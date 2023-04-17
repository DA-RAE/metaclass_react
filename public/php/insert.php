<?php
include 'db.php';

$table = $_POST['table'];
$value = $_POST['value'];

$column = implode(', ', array_keys($value));
$bind = '';
foreach (array_keys($value) as $key) {
    $bind .= ":$key, ";
}
$bind = substr($bind, 0, -2);

try {
    $sql = "INSERT INTO $table ($column) VALUES ($bind)";
    $stmt = $connect->prepare($sql);
    foreach (array_keys($value) as $key) {
        $stmt->bindValue(":$key", $value[$key], PDO::PARAM_STR);
    }
    $stmt->execute();
} catch (PDOException $e) {
    echo 'INSERT 실패 : ' . $e->getMessage();
}
