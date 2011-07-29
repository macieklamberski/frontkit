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
    return load_partials(get_file('_'.$name));
  }
}

function load_partials($content)
{
  return preg_replace('/\{\{\s*([a-z0-9]+)\s*\}\}/e', 'get_partial("$1")', $content);
}

//-- Creating list of pages ---------------------------------------------------

$list = '<div id="fk-pages-list">';

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

// Including header and footer (if not added manually and document is not standalone)
if (strpos($content, '{% standalone %}') === FALSE)
{
  if (strpos($content, '{{ header }}') === FALSE) $content = get_partial('header').$content;
  if (strpos($content, '{{ footer }}') === FALSE) $content = $content.get_partial('footer');
}
else
{
  $content = str_replace('{% standalone %}', '', $content);
}

// Getting partials added manually
$content = load_partials($content);

echo $content;

//-- Displaying list of pages  ------------------------------------------------

if ($display_nav)
{
  echo '<style>#fk-pages-list{background:#f6f6f6;border:3px solid #eee;border-left:0;font:12px sans-serif;left:0;line-height:20px;list-style:none;margin:0;opacity:.8;padding:10px 20px;position:fixed;top:100px;z-index:999}#fk-pages-list a{color:#333;display:block;text-decoration:none}#fk-pages-list a:hover{color:#666}#fk-pages-list .selected a{font-weight:700}</style>';

  echo $list;
}