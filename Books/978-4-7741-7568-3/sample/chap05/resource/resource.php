<?php
error_reporting(E_ALL & ~E_NOTICE);

try {
  $db = new PDO('mysql:host=localhost;dbname=angular;charset=utf8', 'angusr', 'angpass');
  switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET' :
      if (is_null($_SERVER['PATH_INFO'])) {
        $stt = $db->query('SELECT * FROM books ORDER BY published DESC');
        print(json_encode($stt->fetchAll(PDO::FETCH_ASSOC)));
        //print(json_decode($stt->fetchAll(PDO::FETCH_ASSOC), true));
      } else {
        $stt = $db->prepare('SELECT * FROM books WHERE isbn = ?');
        $stt->bindValue(1, explode('/', $_SERVER['PATH_INFO'])[1]);
        $stt->execute();
        if ($row = $stt->fetch(PDO::FETCH_ASSOC)) {
          print(json_encode($row));
        }
      }
      break;
    case 'POST' :
      $input = file_get_contents('php://input');
      $decoded = json_decode($input);
      $stt = $db->prepare('INSERT INTO books(isbn, title, price, publish, published) VALUES(?, ?, ?, ?, ?)');
      $stt->bindValue(1, $decoded->isbn);
      $stt->bindValue(2, $decoded->title);
      $stt->bindValue(3, $decoded->price);
      $stt->bindValue(4, $decoded->publish);
      $stt->bindValue(5, $decoded->published);
      $stt->execute();
      print($input);
      break;
    case 'PUT' :
      $input = file_get_contents('php://input');
      $decoded = json_decode($input);
      $stt = $db->prepare('UPDATE books SET title=?, price=?, publish=?, published=? WHERE isbn=?');
      $stt->bindValue(1, $decoded->title);
      $stt->bindValue(2, $decoded->price);
      $stt->bindValue(3, $decoded->publish);
      $stt->bindValue(4, $decoded->published);
      $stt->bindValue(5, $decoded->isbn);
      $stt->execute();
      print($input);
      break;
    case 'DELETE' :
      $isbn = explode('/', $_SERVER['PATH_INFO'])[1];
      $stt = $db->prepare('DELETE FROM books WHERE isbn = ?');
      $stt->bindValue(1, $isbn);
      $stt->execute();
      print($isbn);
      break;
    default :
      break;
  }
} catch (PDOException $e) {
  die($e->getMessage());
}
$db = NULL;
