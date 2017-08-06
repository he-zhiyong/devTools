<?php 
$request = $_GET;
if (!isset($request["pageName"])) {
	$jsonArray = array();
} else {
	$pageName = $request["pageName"];
	switch($pageName) {
		case "test":
			$xmlPath = "../xml/test/test.xml";
			$dataPath = "../data/test/test.js";
			$resultPath = "";
			break;
		case "buttonLabel":
			$xmlPath = "../xml/buttonLabel/buttonLabel.xml";
			$dataPath = "../data/buttonLabel/buttonLabel.js";
			$resultPath = "";
			break;
		default :
			$xmlPath = "../xml/interview/interviewCheckMainPanel.xml";
			$dataPath = "../data/interview/interviewCheckMainPanel.js";
			$resultPath = "../result/interview/interviewCheckMainPanel.js";
			break;
	}
	// $xmlDate = gmdate("D, d M Y H:i:s",filemtime($xmlPath));
	// $dataDate = gmdate("D, d M Y H:i:s",filemtime($dataPath));
	// $resultDate =max($xmlDate,$dataDate);
	// header("Cache-control: max-age=60");
	// if(isset($_SERVER["HTTP_IF_MODIFIED_SINCE"])&&$_SERVER['HTTP_IF_MODIFIED_SINCE']>=$resultDate){
	// 	header("HTTP/1.1 304 Not Modified"); 
	// 	header("Last-Modified: ".$_SERVER["HTTP_IF_MODIFIED_SINCE"]." GMT");
	// }else{
	// 	header("Last-Modified: ".$resultDate." GMT");
		include_once ("class/createJs.class.php");
		$createJs = new createJs($xmlPath, $dataPath, $resultPath);
		$jsString = $createJs -> main();
		$jsonArray["jsString"] = $jsString;
	// }
}
echo json_encode($jsonArray);
