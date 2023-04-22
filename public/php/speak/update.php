<?php
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    try {
        require_once '../db.php';

        $valueArr = [
            $_POST['language'],
            $_POST['level'],
            $_POST['chapter'],
            $_POST['gubun'],
            $_POST['id'],
            $_POST['kl'],
            $_POST['cl'],
            $_POST['el'],
            $_POST['rl'],
            $_POST['date'],
            $_POST['no']
        ];

        $sql = 'UPDATE speak SET language = :v0, level = :v1, chapter = :v2, gubun = :v3, id = :v4, kl = :v5, cl = :v6, el = :v7, rl = :v8, date = :v9 WHERE no = :v10';
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
