<?php

/**
 * Created by IntelliJ IDEA.
 * User: He_zhi_yong
 * Date: 2017/7/10
 * Time: 13:59
 */
class fileOperate
{
    public $fileName;
    public $filePath;
    public $basePath;
    public $file;

    function __construct($filePath){
        $this->filePath = $filePath;
    }
    function main(){
    }
    function openFile($openType){
        $file = fopen($this->filePath,$openType);
        if($file){
            $this->file = $file;
            return true;
        }else{
            return false;
        }
    }
    function getFileString(){
        $this->openFile("r");
        if($this->file){
            $fileSize = $this->getFileSize($this->filePath);
            if($fileSize){
                $fileString = fread($this->file,$fileSize);
            }else{
                $fileString = "";
            }
            $this->closeFile();
            return $fileString;
        }else{
            return "";
        }
    }
    function closeFile(){
        fclose($this->file);
    }
    function getFileSize($path){
        if(is_file($path)){
            return fileSize($path);
        }else{
            return false;
        }
    }
    function writeFile($dataString,$writeType="cover"){
        switch($writeType){
            case "add":
                $readType = "a";
                break;
            case "cover":
                $readType = "w";
                break;
        }
        $this->openFile($readType);
        if($this->file){
            fwrite($this->file,$dataString);
            $this->closeFile();
            return true;
        }else{
            return false;
        }
    }
}
?>