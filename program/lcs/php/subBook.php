<?php
echo json_encode($_POST);
  
//    function test_input($data){
//        $data = trim($data);
//        $data = stripslashes($data);
//        $data = htmlspecialchars($data);
//        return $data;
//    }
//    $bookName = test_input($_POST["bookName"]);
//    $authorName = test_input($_POST["authorName"]);
//    $creatTime = test_input($_POST["creatTime"]);
//    $select_k1 = test_input($_POST["select_k1"]);
//    $contentText = test_input($_POST["contentText"]);
   
//    //连接数据库
//    $host = '127.0.0.1';
//    $user = 'code1';
//    $pass = '';
//    mysql_connect($host,$user,$pass);
//    mysql_select_db('code1');
//    mysql_query("set names 'utf8'");
//    $sql= "insert into code1(bookName,authorName,creatTime,select_k1,contentText) values(' $bookName','$authorName',' $creatTime','$select_k1','$contentText')";
//    mysql_query($sql);
//    $id = mysql_insert_id();
   
//    echo $id;
//    echo $bookName;
//    echo "<br>";
//    echo $authorName;
//    echo "<br>";
//    echo $crearTime;
//    echo "<br>";
//    echo $select_k1;
//    echo "<br>";
//    echo $contentText;