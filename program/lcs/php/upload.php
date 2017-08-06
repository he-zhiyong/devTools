<?php
if(isset($_FILES)&&isset($_FILES["file"])){
	if($_FILES["file"]["error"]>0){
		$result["success"] = false;
		$result["error"] = array();
		$result["error"]["msg"] = $_FILES["file"]["error"];
		$result["error"]["msg"] = "asdf";
	}else{
		$fileName = $_FILES["file"]["name"];
		$fileType = $request["type"];
		$fileSize = $_FILES["file"]["size"];
		$tmpName = $_FILES["file"]["tmp_name"];
		$baseAddress = "../file/";
		$dirAddress = $baseAddress.$fileType;
		if(!is_dir($dirAddress)){
			mkdir($dirAddress);
		}
		if(is_dir($dirAddress)){
			$fileAddress = $dirAddress."/".$fileName;
			move_uploaded_file($tmpName,$fileAddress);
			if(file_exists($fileAddress)){
				$result["success"] = true;
				$result["data"] = array();
				$result["data"]["address"] = $fileAddress;
				$result["data"]["size"] = $fileSize;
				$result["data"]["type"] = $fileType;
			}else{
				$result["success"] = false;
				$result["error"] = array();
				$result["error"]["msg"] = "upload failed";
			}
		}
	}
}else{
	$result["success"] = false;
	$result["error"] = array();
	$result["error"]["msg"] = "no file";
}
?>