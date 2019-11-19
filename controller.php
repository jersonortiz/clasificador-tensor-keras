<?php
	error_reporting(E_ALL);
	ini_set('display_errors', '1');
	$archivo = $_GET['cumplim'];
	$var = "file".$archivo.".jpg";
	echo $var;
	$resu="";
	$command ="python3 predict.py ".$var." 2>&1";
echo $command."<br>";
	$result = exec($command,$resu);
	echo $result;
	print_r($resu);

?>
