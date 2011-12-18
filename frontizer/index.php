<?php

require 'frontizer.php';

// Detect requested page
$pageName = !empty($_GET['file']) ? $_GET['file'] : 'index.html';

// Detecting current request and additional info
if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
  try
  {
    echo Frontizer::compileFile($pageName, true);
  }
  catch (Exception $e)
  {
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Frontizer: Error</title>
    <link href="frontizer/frontizer.css" rel="stylesheet">
  </head>
  <body>
    <p id="frontizer-error"><?php echo $e->getMessage(); ?></p>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
    <script src="frontizer/frontizer.js"></script>
  </body>
</html>
<?php
  }
}
else
{
  echo Frontizer::buildNavigator($pageName);
}