<?php

include_once("./class/xmlOperate.class.php");

$xmlOperate = new xmlOperate($filePath);
$xmlData = $xmlOperate->getXmlData();

?>
	