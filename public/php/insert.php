<?php
include 'db.php';

$table = $_POST['table'];
$value = $_POST['value'];

try {
    $column = implode(', ', array_keys($value));
    $bind = '';
    for ($i = 0; $i < count($value); $i++) {
        $bind .= ":$i, ";
    }
    $bind = substr($bind, 0, -2);
    
    $sql = "INSERT INTO $table ($column) VALUES ($bind)";
    $stmt = $connect->prepare($sql);
    for ($i = 0; $i < count($value); $i++) {
        $stmt->bindValue(":$i", array_values($value)[$i], PDO::PARAM_STR);
    }
    $stmt->execute();
} catch (PDOException $e) {
    echo 'INSERT 실패 : ' . $e->getMessage();
}
