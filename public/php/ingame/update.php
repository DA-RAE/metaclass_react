<?php
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    try {
        require_once '../db.php';

        $valueArr = [
            $_POST['irum'],
            $_POST['game1'],
            $_POST['game2'],
            $_POST['game3'],
            $_POST['game4'],
            $_POST['game5'],
            $_POST['game6'],
            $_POST['game7'],
            $_POST['total'],
            $_POST['avg'],
            $_POST['id']
        ];

        $sql = 'UPDATE ingame SET irum = :v0, game1 = :v1, game2 = :v2, game3 = :v3, game4 = :v4, game5 = :v5, game6 = :v6, game7 = :v7, total = :v8, avg = :v9 WHERE id = :v10';
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
