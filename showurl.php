<?
$q=trim($_GET['q']);
$lang=trim($_GET['lang']);
$homepage = file_get_contents('/home/likan88/progbuilder.ru/http/url/'.$q.'_'.$lang.'.txt');
echo '<style>img{width:100%;}</style>';
exit($homepage);
