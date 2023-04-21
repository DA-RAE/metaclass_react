<?php
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    try {
        require_once '../db.php';

        $sql = 'DELETE FROM word WHERE no = :v0';
        $stmt = $connect->prepare($sql);
        $stmt->bindValue(':v0', $_POST['no'], PDO::PARAM_STR);
        $stmt->execute();

        header('Content-Type: application/json');
        echo json_encode('SUCCESS');
    } catch (PDOException $e) {
        echo '';
        exit;
    }
} else {
    echo '';
    exit;
}
