<?php
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->post('/book', 'addBook');
$app->get('/book/:id', 'getBook');
$app->get('/books', 'getBookByTitle');
$app->put('/book/:id', 'updateBook');
$app->delete('/book/:id', 'removeBook');
$app->run();

function addBook(){ 
	$request = \Slim\Slim::getInstance()->request();
        $body = $request->getBody();
        $post = json_decode($body);

	$sql = "INSERT INTO books  VALUES (NULL,:title, :author,:status)";

	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("title", $post->title);
		$stmt->bindParam("status", $post->status);
		$stmt->bindParam("author", $post->author);
		$stmt->execute();
		$db = null;
		echo $post->status;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}

}

function removeBook($id){
	$sql = "delete from books where id = :id";

	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo $id;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}

}

function getBookByTitle(){
	$request = \Slim\Slim::getInstance()->request();
	$title = $request->params('name');
	$sql = "select id, title, status, author from books where title like  '%". trim($title) . "%'";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->execute();
		$books = $stmt->fetchAll(PDO::FETCH_OBJ);

		$db = null;

		// Include support for JSONP requests
		if (!isset($_GET['callback'])) {
		    echo json_encode($books);
		} else {
		    echo $_GET['callback'] . '(' . json_encode($books) . ');';
		}

	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getBook($id) {
	$sql = "select id, title, status, author from books where id = :id ";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$employee = $stmt->fetchObject();
		$db = null;

		// Include support for JSONP requests
		if (!isset($_GET['callback'])) {
		    echo json_encode($employee);
		} else {
		    echo $_GET['callback'] . '(' . json_encode($employee) . ');';
		}

	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateBook($id) {
	$request = \Slim\Slim::getInstance()->request();
	$body = $request->getBody();
	$post = json_decode($body);

	$sql = "UPDATE books SET title=:title, author=:author, status=:status WHERE id=:id";

	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->bindParam("status", $post->status);
		$stmt->bindParam("title", $post->title);
		$stmt->bindParam("author", $post->author);
		$stmt->execute();
		$db = null;
		echo $post->id;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="root";
	$dbpass="";
	$dbname="directory";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);  
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}
