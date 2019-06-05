<?
$q=trim($_GET['q']);
$urls=explode("https://vk.com/wall", $q);
$url=explode("_", $urls[1]);
?>
<div id="vk_post_<?= $url[0];?>_<?= $url[1];?>"></div>
<script type="text/javascript">
  (function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "https://vk.com/js/api/openapi.js?160"; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'vk_openapi_js'));
  (function() {
    if (!window.VK || !VK.Widgets || !VK.Widgets.Post || !VK.Widgets.Post('vk_post_<?= $url[0];?>_<?= $url[1];?>', <?= $url[0];?>, <?= $url[1];?>, '4rUrVtG6zLa_yq2CqMi7dpEJeL8')) setTimeout(arguments.callee, 50);
  }());
</script>