<?php

$page = (isset($_GET['page']) ? $_GET['page'] : 'index').'.html';

/*
 * Creating list of pages
 */

$list = '<div id="pages-list">';

foreach (new DirectoryIterator('www') as $file)
{
  if (preg_match('/^[^_].*\.html$/', $file->getFilename()))
  {
    $has_pages = TRUE;

    $list .= '<li'.($page == $file->getFilename() ? ' class="selected"' : '').'>';

    $name = ucfirst(str_replace(array('.html', '_', '-'), array('', ' ', ' '), $file->getFilename()));

    $list .= '<a href="?page='.str_replace('.html', '', $file->getFilename()).'">'.$name.'</a>';
  }
}

$list .= '</div>';

if (empty($has_pages))
{
  die('There are no pages to display.');
}

/*
 * Building current page
 */

if (file_exists('www/'.$page))
{
  // Displaying header
  if (file_exists($header = 'www/_header.html'))
  {
    echo trim(file_get_contents($header), "\n")."\n";
  }

  // Displaying content
  echo trim(file_get_contents('www/'.$page), "\n")."\n";

  // Displaying footer
  if (file_exists($footer = 'www/_footer.html'))
  {
    echo trim(file_get_contents($footer), "\n")."\n";
  }

  if ( ! isset($_GET['navigation']) || $_GET['navigation'] == 1)
  {
    // Displaying styles for pages list
    echo '<style>#pages-list{background:#f6f6f6;border:3px solid #eee;border-left: 0;font:12px sans-serif;line-height:20px;list-style:none;position:absolute;left:0;top:100px;min-width:100px;-moz-border-radius:0 5px 5px 0;border-radius:0 5px 5px 0;-moz-opacity:.8;-webkit-opacity:.8;opacity:.8;z-index:999;margin:0;padding:10px 20px;}#pages-list .selected a{font-weight:700;}#pages-list a{color:#333;display:block;text-decoration:none;}#pages-list a:hover{color:#666;}</style>';

    // Displaying pages list
    echo $list;
  }
}
else
{
  die('Page '.$page.' was not found.');
}
