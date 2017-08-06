<?php
$request = $_POST;
$result = array();
if(isset($request["operate"])){
	switch($request["operate"]){
		case "upload":
		include_once("upload.php");
		break;
		case "download":
		include_once("download.php");
		break;
		default:
		$result["success"] = false;
		$result["error"] = array();
		$result["error"]["msg"] = "do not find this operate";
		break;
	}
}else{
	$result["success"] = false;
	$result["error"] = array();
	$result["error"]["msg"] = "no operate";
}
if($result){
	echo json_encode($result);
}
?>