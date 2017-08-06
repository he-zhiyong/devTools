<?php 
$imgurl = "../css"; 
$currentTime = time();

echo is_int($currentTime)."<br>";
$tmpTime = filemtime($imgurl);
echo "tmpTime:".$tmpTime."<br>";
