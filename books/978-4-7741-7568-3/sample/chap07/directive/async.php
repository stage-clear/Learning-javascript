<?php
error_reporting(E_ALL & ~E_NOTICE);

try {
  $db = new PDO('mysql:host=localhost;dbname=angular;charset=utf8',
    'angusr', 'angpass');
  $stt = $db->prepare('SELECT isbn FROM books WHERE isbn=?');
  $stt->bindValue(1, $_GET['isbn']);
  $stt->execute();
  if ($row = $stt->fetch(PDO::FETCH_ASSOC)) {
    header('HTTP/1.1 200 OK');
    print(json_encode($row));
  } else {
    header('HTTP/1.1 404 Not Found');
  }
} catch (PDOException $e) {
  header('HTTP/1.1 500 Internal Server Error');
  die($e->getMessage());
}
$db = NULL;