<?php
	$archivo = $_GET['cumplim'];
	$var = "file".$archivo.".jpg";
	echo $var;
	$result = exec("python3 predict.py".$var)
	echo $result;

?>