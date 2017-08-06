<?php
if(!isset($request["fileName"])){
	$result["success"] = false;
	$result["error"] = array();
	$result["error"]["msg"] = "no filename";
}elseif(!isset($request["type"])){
	$result["success"] = false;
	$result["error"] = array();
	$result["error"]["msg"] = "no type";
}else{
	$baseAddress = "../file/";
	$fileName = $request["fileName"];
	$file_name = $fileName;
//	$file_name=iconv("utf-8","gb2312",$fileName);  
	$fileAddress = $baseAddress."/".$request["type"]."/".$file_name;
	if(file_exists($fileAddress)){
		$fp = fopen($fileAddress,"r");
		$fileSize = filesize($fileAddress);
		Header("Content-type: application/octet-stream");  
		Header("Accept-Ranges: bytes");  
		Header("Accept-Length:".$fileSize);  
		Header("Content-Disposition: attachment; filename=".$file_name);
		$buffer = 10*1024;
		$file_count =0;
		while(!feof($fp) && $file_count<$fileSize){  
			$file_con=fread($fp,$buffer);  
			$file_count+=$buffer;  
			echo $file_con;
			  
		} 
		fclose($fp);   
	}else{
		$result["success"] = false;
		$result["error"] = array();
		$result["error"]["msg"] = "no file ".$fileAddress;
	}
}
?>