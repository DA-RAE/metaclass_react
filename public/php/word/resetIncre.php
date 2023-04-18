<?php
include '../db.php';

try {
    $connect->exec('ALTER TABLE word AUTO_INCREMENT = 1');
    $stmt = $connect->prepare('SET @COUNT = 0');
    $stmt->execute();
    $stmt = $pdo->prepare('UPDATE word SET no = @COUNT:=@COUNT+1');
    $stmt->execute();
} catch (PDOException $e) {
}
