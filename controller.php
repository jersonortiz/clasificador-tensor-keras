<?php
	error_reporting(E_ALL);
	ini_set('display_errors', '1');
	$archivo = $_GET['cumplim'];
	$var = "file".$archivo.".jpg";

	$resu="";
	$command ="python3 predict.py ".$var." 2>&1";

	$result = exec($command,$resu);
	$json = json_encode($resu;
    print_r($json);



?>
