<?php
/**
 * Created by IntelliJ IDEA.
 * User: He_zhi_yong
 * Date: 2017/7/13
 * Time: 8:44
 */
$basePath = $_POST["path"];
$result = array();
$treeData = array();
$pathData = array();
$folderPath = array();
$filePath = array();
function getDir($basePath){
    if(isset($_POST["keyWord"])){
        $searchKeyWord = $_POST["keyWord"] == "" ? null:$_POST["keyWord"];
    }else{
        $searchKeyWord = null;
    }
    $nodes = array();
    if(is_dir($basePath)){
        $d = dir($basePath);
        while($f = $d->read()){
            if($f == '.' || $f == '..' || substr($f, 0, 1) == '.'|| $f =="extjs" || $f == "result" || $f == "php" || $f =="lib") continue;
            $filename = $basePath . '/' . $f;
            if(is_dir($basePath.'/'.$f)){
                $tmpChildren = getDir($basePath.'/'.$f);
                $nodes[] = array(
                    'text' => $f,
                    'path' => $filename,
                    'id' => $filename,
                    'type' => "folder",
                    'cls'  => 'folder',
                    'searchWord' => stristr($f,$searchKeyWord) ? true:false,
                    'children' => $tmpChildren
                );
                if(stristr($f,$searchKeyWord)){
                    $GLOBALS["folderPath"][] = $filename;
                }
            } else {
                $imageArray = @getimagesize($filename);
                if($imageArray){
                    $fileType = "image";
                    $fileArray["name"] = $f;
                    $fileArray["path"] = $filename;
                    $fileArray["width"] = $imageArray[0];
                    $fileArray["height"] = $imageArray[1];
                    $fileArray["contentType"] = $imageArray["mime"];
                    $fileArray["size"] = fileSize($filename);
                    if(stristr($f,$searchKeyWord)||$searchKeyWord == null) {
                        $nodes[] = array(
                            'text' => $f,
                            'path' => $filename,
                            'id' => $filename,
                            'type' => $fileType,
                            'leaf' => true,
                            'cls'  => 'file',
                            'searchWord' => stristr($f,$searchKeyWord) ? true:false,
                            'fileMsg' => $fileArray
                        );
                    }
                }else{
                    $fileInfo = pathInfo($filename);
                    $fileExtension = $fileInfo["extension"];
                    switch($fileExtension){
                        case "svg":
                            $fileType = "svg";
                            break;
                        case "xml":
                            $fileType = "xml";
                            break;
                        default:
                            $fileType = "file";
                            break;
                    }
                    $fileArray["name"] = $f;
                    $fileArray["path"] = $filename;
                    $fileArray["size"] = fileSize($filename);
                    if(stristr($f,$searchKeyWord)||$searchKeyWord == null) {
                        $nodes[] = array(
                            'text' => $f,
                            'path' => $filename,
                            'id' => $filename,
                            'type' => $fileType,
                            'leaf' => true,
                            'cls' => 'file',
                            'searchWord' => stristr($f, $searchKeyWord) ? true : false,
                            "fileMsg" => $fileArray
                        );
                    }
                    if(stristr($f,$searchKeyWord)){
                        $GLOBALS["filePath"][] = $filename;
                    }
                }
            }
        }
    }
    return $nodes;
}
function dataFilter($data){
    $list = array();
    $path = array();
    $list[0] = $data;
    while(!empty($list)){
        $items = array_shift($list);
        //echo "目录：".$items['text']." 数量：".count($items['children'])." 符合：".$items['searchWord'].'<br>';
        if(isset($items['children'])){
            if(count($items['children'])){
                $list = array_merge($list,$items['children']);
            }else{
                if(!$items['searchWord']){
                    $path_array = explode('/',$items['path']);
                    for($i = 0;$i < 5;$i++){
                        array_shift($path_array);
                    }
                    $pathStr = "";
                    for($i = 0;$i < count($path_array);$i++){
                        $pathStr = $pathStr."['children']"."['".$path_array[$i]."']";
                    }
                    $path[] = $pathStr;
                }
            }
        }
    }
    return $path;
}
function filterData($data){
    for($i = 0;$i < count($data);$i++){
        if(isset($data[$i]['children'])){
            if(count($data[$i]['children'])){
                $data[$i]['children'] = filterData($data[$i]['children']);
                //print_r($data[$i]);
            }else{
                if(!$data[$i]['searchWord']){
                    $data[$i]['cls'] = null;
                }
                //array_slice($data,0);
                //unset($data[$i]);
                //print_r($data[$i]);
                //$data[$i] = null;
                //print_r($data[$i]);
                /*if(!$data[$i]['searchWord']){
                   unset($data[$i]);
                }*/
            }
        }
    }
    return $data;
}
if(is_dir($basePath)){
    $treeData = getDir($basePath);
    //$treeData = filterData($treeData);
    /*for($i = 0;$i < count($treeData);$i++){
        if($treeData[$i]['type'] == "folder"){
            $treeData[$i] = dataFilter($treeData[$i]);
        }
    }*/
   /* $pathData[] = $folderPath;
    $pathData[] = $filePath;*/
    $result["success"] = true;
    $result["data"] = $treeData;
}else{
    $result["success"] = false;
    $result["data"] = $treeData;
    $result["error"]["msg"] = "not dir";
}
echo json_encode($treeData);
?>