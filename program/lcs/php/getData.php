<?php
function getJsonData($jsonAddress){
    $file = fopen($jsonAddress,"r");
    $fileString = "";
    if($file){
        $fileSize = fileSize($jsonAddress);
        $fileString = fread($file,$fileSize);
    }
    return $fileString;
}


$data=file_get_contents("php://input");
$paramsArray = json_decode($data,true);

$service_id = $paramsArray["SERVICE_ID"];
switch($service_id){
    case array(11,10,1060) :
        $jsonAddress = "../testData/marcRule.json";
        break;
    case array(11,10,1050) :
        $jsonAddress = "../testData/marc.json";
        break;
    case array(13, 11, 1000):
        $jsonAddress = "../testData/bookList.json";
        break;
    case array(25,10,1050):
        $jsonAddress = "../testData/clcList.json";
        break;
    case array(13, 20, 2000):
        $jsonAddress = "../testData/reviewList.json";
        break;
    case array(1,1,2011):
        $query = $paramsArray["query"];
        $confName = $query["confName"];
        switch($confName){
            case "DocumentLanguageType":
                $jsonAddress = "../testData/languageList.json";
                break;
            case "DocumentType":
                $jsonAddress = "../testData/documentTypeList.json";
                break;
			case "NormalType":
				$jsonAddress = "../testData/normalTypeList.json";
				break;
			case "publisher":
				$jsonAddress = "../testData/publisherData.json";
				break;
            case "course":
                $jsonAddress = "../testData/courseList.json";
                break;
		}
		break;
}
$jsonString = getJsonData($jsonAddress);
echo $jsonString;
?>