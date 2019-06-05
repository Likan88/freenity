<?
$q=trim($_GET['q']);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.instagram.com/oembed/?url='.$q);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
$apiObj = json_decode($output,true);
echo '<div style="width: 326px;margin:0 auto;">'.$apiObj['html'].'</div>';
exit();
