<?php
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    try {
        require_once '../db.php';

        $valueArr = [
            $_POST['id'],
            $_POST['password'],
            $_POST['email'],
            $_POST['irum'],
            $_POST['nickname'],
            $_POST['date']
        ];

        $sql = 'SELECT COUNT(id) as :id FROM member GROUP BY id HAVING COUNT(id) > 1';
        $stmt = $connect->prepare($sql);
        $stmt->bindValue(':id', $valueArr[0], PDO::PARAM_STR);
        $stmt->execute();
        $count = $stmt->rowCount();
        if ($count > 0) {
            header('Content-Type: application/json');
            echo json_encode('DUPLICATION');
            exit;
        }

        $sql = 'INSERT INTO member (id, password, email, irum, nickname, date) VALUES (:v0, :v1, :v2, :v3, :v4, :v5)';
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
