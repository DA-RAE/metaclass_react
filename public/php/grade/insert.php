<?php
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    try {
        require_once '../db.php';

        $valueArr = [
            $_POST['id'],
            $_POST['irum'],
            $_POST['game'],
            $_POST['chapter'],
            $_POST['mid'],
            $_POST['final'],
            $_POST['total']
        ];

        $sql = 'INSERT INTO grade (id, irum, game, chapter, mid, final, total) VALUES (:v0, :v1, :v2, :v3, :v4, :v5, :v6)';
        $stmt = $connect->prepare($sql);
        foreach ($valueArr as $index => $value) {
            $stmt->bindValue(':v' . $index, $value, PDO::PARAM_STR);
        }
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
