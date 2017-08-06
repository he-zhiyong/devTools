<?php
/**
 * Created by IntelliJ IDEA.
 * User: He_zhi_yong
 * Date: 2017/7/10
 * Time: 13:45
 */
$request = $_REQUEST;
$result = array();
if(!isset($request["operate"])){
    $result["success"] = false;
    $result["error"]["msg"] = "no operate";
}elseif(!isset($request["filePath"])){
    $result["success"] = false;
    $result["error"]["msg"] = "no path";
}else{
    $operate = $request["operate"];
    include_once("./class/fileOperate.class.php");
    $filePath = $request["filePath"];
    $fileOperate = new fileOperate($filePath);
    switch($operate){
        case "write":
            if(isset($request["fileString"])){
                $tmpResult = $fileOperate->writeFile(stripslashes(htmlspecialchars_decode($request["fileString"])));
                if($tmpResult){
                    $fileString = $fileOperate->getFileString() ;
                    $result["success"] = true;
                    $result["data"]["fileString"] = $fileString;
                }else{
                    $result["success"] = false;
                    $result["error"]["msg"] = "write file failed";
                }
            }
            break;
        case "read":
            $fileString = $fileOperate->getFileString() ;
            $result["success"] = true;
            $result["data"]["fileString"] = $fileString;
            break;
    }
}
echo json_encode($result);
?>