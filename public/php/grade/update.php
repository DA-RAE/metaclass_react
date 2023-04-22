<?php
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    try {
        require_once '../db.php';

        $valueArr = [
            $_POST['irum'],
            $_POST['game'],
            $_POST['chapter'],
            $_POST['mid'],
            $_POST['final'],
            $_POST['total'],
            $_POST['id']
        ];

        $sql = 'UPDATE grade SET irum = :v0, game = :v1, chapter = :v2, mid = :v3, final = :v4, total = :v5 WHERE id = :v6';
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
