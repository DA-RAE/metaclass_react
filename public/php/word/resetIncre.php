<?php
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    try {
        require_once '../db.php';

        $connect->exec('ALTER TABLE word AUTO_INCREMENT = 1');
        $stmt = $connect->prepare('SET @COUNT = 0');
        $stmt->execute();
        $stmt = $pdo->prepare('UPDATE word SET no = @COUNT:=@COUNT+1');
        $stmt->execute();
    } catch (PDOException $e) {
        echo '';
        exit;
    }
} else {
    echo '';
    exit;
}
