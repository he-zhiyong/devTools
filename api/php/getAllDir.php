<?php
/**
 * Created by IntelliJ IDEA.
 * User: He_zhi_yong
 * Date: 2017/7/21
 * Time: 13:18
 */
$basePath = $_POST["path"];
$result = array();
function getDir($basePath){
    $nodes = array();
    if(is_dir($basePath)){
        $d = dir($basePath);
        while($f = $d->read()){
            if($f == '.' || $f == '..' || substr($f, 0, 1) == '.'|| $f =="extjs" || $f == "result" || $f =="lib") continue;
            $filename = $basePath . '/' . $f;
            if(is_dir($basePath.'/'.$f)){
                $tmpChildren = getDir($basePath.'/'.$f);
                $nodes[] = array(
                    'label' => $f,
                    'path' => $filename,
                    'id' => $filename,
                    'type' => "folder",
                    'children' => $tmpChildren
                );
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
                    $nodes[] = array(
                        'label' => $f,
                        'path' => $filename,
                        'id' => $filename,
                        'type' => $fileType,
                        'fileMsg' => $fileArray
                    );

                }else{
                    $fileInfo = pathInfo($filename);
                    if(isset($fileInfo["extension"])){
                        $fileExtension = $fileInfo["extension"];
                        $readOnly = false;
                        $fileType = $fileExtension;
                        switch($fileExtension){
                            case "php":
                                $readOnly = true;
                                break;
                        }
                        $fileArray["name"] = $f;
                        $fileArray["path"] = $filename;
                        $fileArray["size"] = fileSize($filename);
                        $nodes[] = array(
                            'label' => $f,
                            'path' => $filename,
                            'id' => $filename,
                            'type' => $fileType,
                            "fileMsg" => $fileArray,
                            'readOnly'=> $readOnly
                        );
                    }
                }
            }
        }
    }
    return $nodes;
}
if(is_dir($basePath)){
    $result["success"] = true;
    $result["data"] = getDir($basePath);
}else{
    $result["success"] = false;
    $result["data"] = null;
    $result["error"]["msg"] = "not dir";
}
echo json_encode($result);
?>