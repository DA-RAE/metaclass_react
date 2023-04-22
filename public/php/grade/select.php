<?php
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    try {
        require_once '../db.php';

        $sql = "UPDATE grade g1 SET g1.rank = ( SELECT COUNT(*) + 1 FROM grade g2 WHERE g2.total > g1.total)";
        $stmt = $connect->prepare($sql);
        $stmt->execute();

        $sql = "SELECT * FROM grade ORDER BY rank ASC";
        $stmt = $connect->prepare($sql);
        $stmt->execute();

        header('Content-Type: application/json');
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } catch (PDOException $e) {
        echo '';
        exit;
    }
} else {
    echo '';
    exit;
}
