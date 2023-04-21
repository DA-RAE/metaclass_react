<?php
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    try {
        require_once '../db.php';

        $valueArr = [
            $_POST['language'],
            $_POST['level'],
            $_POST['chapter'],
            $_POST['gubun'],
            $_POST['kl'],
            $_POST['cl'],
            $_POST['el'],
            $_POST['rl'],
            $_POST['date'],
        ];

        $sql = 'INSERT INTO word (language, level, chapter, gubun, kl, cl, el, rl, date) VALUES (:v0, :v1, :v2, :v3, :v4, :v5, :v6, :v7, :v8)';
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
