<?php
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    try {
        require_once '../db.php';

        $valueArr = [
            $_POST['id'],
            $_POST['irum'],
            $_POST['game1'],
            $_POST['game2'],
            $_POST['game3'],
            $_POST['game4'],
            $_POST['game5'],
            $_POST['game6'],
            $_POST['game7'],
            $_POST['total'],
            $_POST['avg']
        ];

        $sql = 'INSERT INTO ingame (id, irum, game1, game2, game3, game4, game5, game6, game7, total, avg) VALUES (:v0, :v1, :v2, :v3, :v4, :v5, :v6, :v7, :v8, :v9, :v10)';
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
