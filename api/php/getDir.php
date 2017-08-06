<?php
/**
 * Created by IntelliJ IDEA.
 * User: He_zhi_yong
 * Date: 2017/7/10
 * Time: 11:22
 */
$request = $_REQUEST;

$baseDir = "";
$result = array();
$nodes = array();
$currentTime = time();
$dTime = 100*24*60*60;
$deadTime = $currentTime - $dTime;
$newFlag = false;
if(isset($request["path"])){
    $directory = $baseDir.$request["path"];
}
if(isset($request["newFlag"])){
    $newFlag = true;
}
if(is_dir($directory)){
    $d = dir($directory);
    while($f = $d->read()){
        if($f == '.' || $f == '..' || substr($f, 0, 1) == '.'|| $f =="extjs" || $f == "result" || $f == "php" || $f =="lib") continue;

        switch($f){
            case "extjs":
            case "result":
            case "xml":
                break;
            default:
                $filename = $directory . '/' . $f;
                if(is_dir($directory.'/'.$f)){
                    $tmpTime = filemtime($filename);
                    if($tmpTime>$deadTime||$f == "baseXml"||$f =="window"){
                        $nodes[] = array(
                            'text' => $f,
                            'path' => $filename,
                            'id' => $filename,
                            'type' => "folder",
                            'cls'  => 'folder',
                        );
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
                        $nodes[] = array(
                            'text' => $f,
                            'path' => $filename,
                            'id' => $filename,
                            'type' => $fileType,
                            'leaf' => true,
                            'cls'  => 'file',
                            'fileMsg' => $fileArray
                        );
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

                        $tmpTime = filemtime($filename);
                        if($tmpTime>$deadTime){
                            $fileArray["name"] = $f;
                            $fileArray["path"] = $filename;
                            $fileArray["size"] = fileSize($filename);
                            $nodes[] = array(
                                'text' => $f,
                                'path' => $filename,
                                'id' => $filename,
                                'type' => $fileType,
                                'leaf' => true,
                                'cls'  => 'file',
                                "fileMsg" => $fileArray
                            );
                        }
                    }
                }
                break;
        }
    }
    $result = $nodes;
}else{
    $result["success"] = false;
    $result["data"] = $nodes;
    $result["error"]["msg"] = "not dir";
}
echo json_encode($result);
?>