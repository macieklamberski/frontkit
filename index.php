<?php

//-- Setup --------------------------------------------------------------------

$page_name   = (isset($_GET['page']) ? $_GET['page'] : 'index').'.html';
$display_nav = ( ! isset($_GET['nav']) || $_GET['nav'] == 1);

//-- Function declarations ----------------------------------------------------

function get_file($file)
{
  return file_get_contents('www/'.$file.'.html');
}

function get_partial($name)
{
  if (file_exists('www/_'.$name.'.html'))
  {
    return get_file('_'.$name);
  }
}

//-- Creating list of pages ---------------------------------------------------

$list = '<div id="pages-list">';

foreach (new DirectoryIterator('www') as $file)
{
  if (preg_match('/^[^_].*\.html$/', $file->getFilename()))
  {
    $has_pages = TRUE;

    $list .= '<li'.($page_name == $file->getFilename() ? ' class="selected"' : '').'>';

    $name = ucfirst(str_replace(array('.html', '_', '-'), array('', ' ', ' '), $file->getFilename()));

    $list .= '<a href="?page='.str_replace('.html', '', $file->getFilename()).'">'.$name.'</a>';
  }
}

$list .= '</div>';

//-- Displaying errors --------------------------------------------------------

if ( ! file_exists('www/'.$page_name))
{
  die('Page '.$page_name.' was not found.');
}

if (empty($has_pages))
{
  die('There are no pages to display.');
}

//-- Assembling current page --------------------------------------------------

$content = get_file(str_replace('.html', '', $page_name));

// Automatically adding header and footer partials (if not added manually)
if (strpos($content, '{{ header }}') === FALSE) $content = get_partial('header').$content;
if (strpos($content, '{{ footer }}') === FALSE) $content = $content.get_partial('footer');

// Getting partials added manually
$content = preg_replace('/\{\{\s*([a-z0-9]+)\s*\}\}/e', 'get_partial("$1")', $content);

echo $content;

//-- Displaying list of pages  ------------------------------------------------

if ($display_nav)
{
  echo '<style>#pages-list{background:#f6f6f6;border:3px solid #eee;border-left: 0;font:12px sans-serif;line-height:20px;list-style:none;position:absolute;left:0;top:100px;min-width:100px;-moz-border-radius:0 5px 5px 0;border-radius:0 5px 5px 0;-moz-opacity:.8;-webkit-opacity:.8;opacity:.8;z-index:999;margin:0;padding:10px 20px;}#pages-list .selected a{font-weight:700;}#pages-list a{color:#333;display:block;text-decoration:none;}#pages-list a:hover{color:#666;}</style>';
  echo $list;
}
