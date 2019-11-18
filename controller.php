<?php
if(isset($_POST['radio']))
{
	echo "You have selected :".$_POST['cumplim']; 
	$archivo = $_POST['cumplim'];
	$var = "file".$archivo.".jpg";
	$result = exec("python3 predict.py .$var");
	echo "hola";
	echo $result;
}

?>