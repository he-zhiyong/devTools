<?php
$request = $_GET;
if (!isset($request["templateName"])) {
    $jsonArray["success"] = true;
    $jsonArray["data"]["htmlString"] = "";
    $jsonArray["error"]["msg"] = "no request";
} else {
    $templateName = $request["templateName"];
    $templatePath = "../XTemplate/".$templateName.".html";
    $templateString = preg_replace('/((\s)*(\n)+(\s)*)/i','',getFileString($templatePath));
    $jsonArray["success"] = true;
    $jsonArray["data"]["templateString"] = $templateString;
}
echo json_encode($jsonArray);


//从文件中获取代码
function getFileString($fileAddress){
    $file = fopen($fileAddress,"r");
    if($file){
        $fileString = fread($file,filesize($fileAddress));
        fclose($file);
    }else{
        $fileString = "";
    }
    return $fileString;
}
