<?php
include '../db.php';

try {
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
        $_POST['no']
    ];

    $sql = 'UPDATE word SET language = :v0, level = :v1, chapter = :v2, gubun = :v3, kl = :v4, cl = :v5, el = :v6, rl = :v7, date = :v8 WHERE no = :v9';
    $stmt = $connect->prepare($sql);
    foreach ($valueArr as $index => $value) {
        $stmt->bindValue(':v' . $index, $value, PDO::PARAM_STR);
    }
    $stmt->execute();
} catch (PDOException $e) {
}
