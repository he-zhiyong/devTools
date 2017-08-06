<?php
//$url = $_GET["url"];
$caseno = $_GET["caseno"];
$bar = $_GET["bar"];
if($caseno){
	$url = "http://opac.lib.stu.edu.cn:83/opac/stu/showBooksByCase.aspx?caseno=".$caseno."&bar=".$bar;
	$html = file_get_contents($url);
	$html = str_replace("../","http://opac.lib.stu.edu.cn:83/opac/",$html);
	echo $html;
}else{
	echo "";
}
?>
