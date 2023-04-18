<?php
include '../db.php';

try {
    $sql = 'DELETE FROM word WHERE no = :v0';
    $stmt = $connect->prepare($sql);
    $stmt->bindValue(':v0', $_POST['no'], PDO::PARAM_STR);
    $stmt->execute();
} catch (PDOException $e) {
}
