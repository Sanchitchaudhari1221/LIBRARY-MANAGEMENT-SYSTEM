<?php 
session_start();
$_SESSION["userid"] = '';
$_SESSION["name"] = '';
$_SESSION["role"] = '';
header("Location:index.php");
?>






