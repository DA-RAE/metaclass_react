<?php
include '../db.php';

try {
    $sql = 'SELECT * FROM word';
    $stmt = $connect->prepare($sql);
    $stmt->execute();

    header('Content-Type: application/json');
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (PDOException $e) {
}
