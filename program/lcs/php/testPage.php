<?php
$request = $_POST;
$jsonArray = array();
if (!isset($request["xmlPath"])||!isset($request["jsonPath"])) {
	$jsonArray["success"] = false;
} else {
	$xmlPath = $request["xmlPath"];
	$dataPath = $request["jsonPath"];
	$resultPath = "../result/test.js";
	include_once ("class/createJs.class.php");
	$createJs = new createJs($xmlPath, $dataPath, $resultPath);
	$jsString = $createJs -> main();
	$jsonArray["success"] = true;
	$jsonArray["jsString"] = $jsString;
}
echo json_encode($jsonArray);