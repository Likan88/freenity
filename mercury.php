<?
$url=$_GET['url'];
$result=exec('/bin/sh /home/likan88/progbuilder.ru/http/mercury.sh '.$url.' 2>&1', $output);
$str='';
foreach ($output as $item) $str.=$item;
$str = substr($str, 0, 50000);
exit(trim($str));