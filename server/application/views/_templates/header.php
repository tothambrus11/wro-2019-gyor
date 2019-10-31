<?php
if (!isset($title) || trim($title) == "") {
    $title = $this->config->item("page_title");
} else {
    $title = $title . " - " . $this->config->item("page_title");
}
?>
<!doctype html>
<html>
<head>
    <title><?php echo $title; ?></title>

	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="stylesheet" type="text/css" href="<?php echo css_url('bootstrap.min.css'); ?>">
    <link rel="stylesheet" type="text/css" href="<?php echo css_url('fa/css/fontawesome-all.css'); ?>">
    <link rel="stylesheet" type="text/css" href="<?php echo css_url('sb-admin.min.css'); ?>">
    <link rel="stylesheet" type="text/css" href="<?php echo css_url('style.css'); ?>">

    <script src="<?php echo js_url("jquery.min.js"); ?>"></script>
    <script src="<?php echo js_url("bootstrap.min.js"); ?>"></script>
    <script src="<?php echo js_url("sb-admin.min.js"); ?>"></script>

</head>
<body>
