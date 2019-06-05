<?
error_reporting(E_ALL);
ini_set('display_errors',1);
$arr=explode('/',$_GET['video']);
$result=exec('/bin/sh /home/liken88/progbuilder.ru/http/showvideo.sh '.$arr[1].' 2>&1', $output);
var_dump($output,$result);