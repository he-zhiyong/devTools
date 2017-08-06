<?php
$filePath = $_POST["path"];
$operate = $_POST["operate"];
include_once("./class/xmlOperate.class.php");
$nodeData = array();
$pathInfo = pathInfo($filePath);
$dirInfo = pathInfo($pathInfo["dirname"]);
$nodeData["name"] = $pathInfo["filename"];
$nodeData["type"] = $dirInfo["filename"];
$nodeData["path"] = $filePath;
$xmlOperate = new xmlOperate($nodeData);
switch($operate){
	case "read":
		$xmlData = $xmlOperate->main();
		$result["success"] = true;
		$result["data"] = $xmlData;
		echo json_encode($result);
	break;
	case "update":
		$newXmlData = $_POST["data"];
		$xmlData = $xmlOperate->updateXml($newXmlData);
		$result["success"] = true;
		$result["data"] = $xmlData;
		echo json_encode($result);
		break;
	case "test":
		$xmlData = $xmlOperate->main();
		$xmlPath = $xmlOperate->createTestXml();
//		$xmlPath = $xmlOperate->createXml();
		$jsonPath = $xmlOperate->createJson();
		$resultPath = "../../../editor/lcs/result/test.js";
		if($xmlPath&&$jsonPath){
			include_once("../../../editor/lcs/php/class/createJs.class.php");
			$createJs = new createJs($xmlPath,$jsonPath,$resultPath);
			$jsString = $createJs->main();
			$result["success"] = true;
			$result["data"]["jsString"] = $jsString;
			$result["data"]["type"] = $nodeData["type"];
			$result["data"]["name"] = $nodeData["name"];
			echo json_encode($result);
		}
	break;
	case "create":
		$xmlData = $xmlOperate->main();
		$xmlPath = $xmlOperate->createXml();
		$jsonPath = $xmlOperate->createJson();
		$resultPath = "../../../editor/lcs/result/test.js";
		if($xmlPath&&$jsonPath){
			include_once("../../../editor/lcs/php/class/createJs.class.php");
			$createJs = new createJs($xmlPath,$jsonPath,$resultPath);
			$jsString = $createJs->main();
			$result["success"] = true;
			$result["data"]["jsString"] = $jsString;
			$result["data"]["type"] = $nodeData["type"];
			$result["data"]["name"] = $nodeData["name"];
			echo json_encode($result);
		}
	break;
}
?>
	