<?php
$request = $_POST;
$jsonArray = array();
if(!isset($request["compName"])){
	$jsonArray["success"] = false;
}else{
	$jsonArray["success"] = true;
	include_once("class/createXml.class.php");
	$baseData = array();
	$baseData["name"] = $request["compName"];
	$baseData["type"] = $request["compType"];
	$createXml = new createXml($baseData);
	$resultArray = $createXml->main();
	$xmlPath = $createXml->createXml();
	$jsonPath = $createXml->createJson();
	$jsonArray["success"] = true;
	$jsonArray["jsonPath"] = $jsonPath;
	$jsonArray["xmlPath"] = $xmlPath;
}
echo json_encode($jsonArray);
?>