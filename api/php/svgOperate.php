<?php
/**
 * Created by IntelliJ IDEA.
 * User: dell
 * Date: 2017/7/11
 * Time: 16:42
 */
$filePath = $_POST["path"];
$operate = $_POST["operate"];
include_once("./class/svgOperate.class.php");
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
}
?>