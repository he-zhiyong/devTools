<?php
	$dataString = file_get_contents("php://input",r);
	$requestData = json_decode($dataString,true);
	$result = array();
	$result["success"] = false;
	if(isset($requestData["memberNo"])&&isset($requestData["ctrlNo"])){
		include_once("./class/httpRequest.php");
		$url = "http://192.168.64.108/addgpsq.ashx";
		$type = "GET";
		$params = array();
		$params["uid"] = $requestData["memberNo"];
		$params["ctrlno"] = $requestData["ctrlNo"];
		if(!isset($requestData["email"])){
			$requestData["email"] = "";
			
		}
		$params["email"] = $requestData["email"];
		$url = $url."?"."uid=".$params["uid"]."&ctrlno=".$params["ctrlno"]."&email=".urlencode($params["email"]);
		$headers = "";
		$httpRequest = new httpRequest();
		$response = $httpRequest->httpRequestFn($url,$type,$params,$headers);
		$result["success"] = true;
		$result["url"] = $url;
		$result["data"] = $response;
	}else{
		$result["data"] = false;
	}
	echo json_encode($result);
	
	




?>