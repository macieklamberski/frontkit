<?php

require 'frontline.php';

// Detect requested page
$pageName = !empty($_GET['file']) ? $_GET['file'] : 'index.html';

try
{
  $content = Frontline::compileFile($pageName);
  $content = Frontline::install($content, $pageName);

  echo $content;
}
catch (Exception $e)
{
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Frontline Error</title>
    <link href="frontline/frontline.css" rel="stylesheet">
  </head>
  <body>
    <p id="frontline-error"><?php echo $e->getMessage(); ?></p>
  </body>
</html>
<?php
}