<?php
include 'db.php';

$table = $_POST['table'];

try {
    $sql = "SHOW TABLE STATUS LIKE '$table'";
    $stmt = $connect->prepare($sql);
    $stmt->execute();

    header('Content-Type: application/json');
    echo json_encode(($stmt->fetch(PDO::FETCH_ASSOC))['Auto_increment']);
} catch (PDOException $e) {
    echo 'Auto_increment 실패 : ' . $e->getMessage();
}
