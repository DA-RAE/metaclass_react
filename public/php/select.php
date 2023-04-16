<?php
include 'db.php';

$table = $_POST['table'];

try {
    $sql = "SELECT * FROM $table";
    $stmt = $connect->prepare($sql);
    $stmt->execute();

    header('Content-Type: application/json');
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (PDOException $e) {
    echo 'SELECT 실패 : ' . $e->getMessage();
}
