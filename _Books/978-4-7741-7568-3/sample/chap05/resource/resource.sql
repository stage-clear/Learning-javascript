--rootユーザーでログイン
mysql -u root -p

--angular データベースを作成
CREATE DATABASE angular;

--angular データベースに移動
USE angular;

--angusr ユーザー（パスワードは angpass）を作成
GRANT all privileges ON angular.* TO angusr@localhost IDENTIFIED BY 'angpass';

--books テーブルを作成
CREATE TABLE books (isbn CHAR(17) PRIMARY KEY, title VARCHAR(100), price INT, publish VARCHAR(30), published DATE);

--books テーブルにサンプルデータを登録
INSERT INTO books VALUES ('978-4-7741-7078-7', 'サーブレット＆JSPポケットリファレンス', 2680, '技術評論社', '2015-01-08');
INSERT INTO books VALUES ('978-4-8222-9634-6', 'アプリを作ろう！Android入門', 2000, '日経BP', '2014-12-20');
INSERT INTO books VALUES ('978-4-7980-4179-7', 'ASP.NET MVC 5実践プログラミング', 3500, '秀和システム', '2014-09-20');
INSERT INTO books VALUES ('978-4-7981-3546-5', 'JavaScript逆引きレシピ', 3000, '翔泳社', '2014-08-28');
INSERT INTO books VALUES ('978-4-7741-6566-0', 'PHPライブラリ＆サンプル実践活用', 2480, '技術評論社', '2014-06-24');
INSERT INTO books VALUES ('978-4-7741-6410-6', 'Rails 4アプリケーションプログラミング', 3500, '技術評論社', '2014-04-11');

