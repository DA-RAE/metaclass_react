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

        $sql = 'SELECT COUNT(*) FROM member WHERE id = :id';
        $stmt = $connect->prepare($sql);
        $stmt->bindParam(':id', $valueArr[0]);
        $stmt->execute();
        $count = $stmt->fetchColumn();

        if ($count > 0) {
            header('Content-Type: application/json');
            echo json_encode('DUPLICATION');
        } else {
            exit;
            $sql = 'INSERT INTO member (id, password, email, irum, nickname, date) VALUES (:v0, :v1, :v2, :v3, :v4, :v5)';
            $stmt = $connect->prepare($sql);
            foreach ($valueArr as $index => $value) {
                $stmt->bindValue(':v' . $index, $value, PDO::PARAM_STR);
            }
            $stmt->execute();

            header('Content-Type: application/json');
            echo json_encode('SUCCESS');
        }
    } catch (PDOException $e) {
        echo '';
        exit;
    }
} else {
    echo '';
    exit;
}
