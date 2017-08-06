<?php
$request = $_REQUEST;
$baseDir = "";
$result = array();
$nodes = array();
if(isset($request["path"])){
	$directory = $baseDir.$request["path"];
}
if(is_dir($directory)){
	$d = dir($directory);
	while($f = $d->read()){
		if($f == '.' || $f == '..' || substr($f, 0, 1) == '.'|| $f =="extjs" || $f == "result" || $f == "php" || $f =="js") continue;
		
		$filename = $directory . '/' . $f;
		
		if(is_dir($directory.'/'.$f)){
            $nodes[] = array(
                'text' => $f,
                'path' => $filename,
                'id' => $filename,
                'type' => "folder",
                'cls'  => 'folder'
            );
        } else {
        	$imageArray = @getimagesize($filename);
        	if($imageArray){
        		$fileType = "image";
	            $nodes[] = array(
	                'text' => $f,
	                'path' => $filename,
	                'id' => $filename,
	                'type' => $fileType,
	                'leaf' => true,
	                'cls'  => 'file',
	                'imageMsg' => $imageArray
	            );
        	}else{
        		$fileInfo = pathInfo($filename);
        		$fileExtension = $fileInfo["extension"];
        		switch($fileExtension){
        			case "xml":
        			case "xsd":
        			$fileType = "xml";
        			break;
        			default:
        			$fileType = "file";
        			break;
        		}
	            $nodes[] = array(
	                'text' => $f,
	                'path' => $filename,
	                'id' => $filename,
	                'type' => $fileType,
	                'leaf' => true,
	                'cls'  => 'file'
	            );
        	}
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