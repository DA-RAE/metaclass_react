<?php
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    try {
        require_once '../db.php';
        
        $sql = "SHOW TABLE STATUS LIKE 'word'";
        $stmt = $connect->prepare($sql);
        $stmt->execute();

        header('Content-Type: application/json');
        echo json_encode(($stmt->fetch(PDO::FETCH_ASSOC))['Auto_increment']);
    } catch (PDOException $e) {
        echo '';
        exit;
    }
} else {
    echo '';
    exit;
}
