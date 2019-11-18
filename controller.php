<?php
	error_reporting(E_ALL);
	ini_set('display_errors', '1');
	$archivo = $_GET['cumplim'];
	$var = "file".$archivo.".jpg";
	echo $var;
	$result = exec("python3 predict.py".$var)
	echo $result;

?>