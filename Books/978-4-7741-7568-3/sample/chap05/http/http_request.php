<?php
$n = $_POST['name'];
if (empty($n)) {
  header('HTTP/1.1 500 Internal Server Error');
} else {
  print('こんにちは、'.$n.'さん！');
}

