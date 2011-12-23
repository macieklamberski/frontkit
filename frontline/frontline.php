<?php

/**
 * Class responsible for all the main features of Frontline. It contains static
 * methods called at the request in special circumstances.
 */
class Frontline
{
  /**
   * Function iterates over the main directory and builds markup for available
   * pages.
   *
   * @param   string  Full filename of currently viewed page
   * @param   bool    Whether to display navigator
   * @return  string
   */
  public static function buildNavigator($pageName)
  {
    $list = '<ul id="frontline-navigator">';

    foreach (new DirectoryIterator('..') as $file)
    {
      if (preg_match('/^[^_].*\.html$/', $file->getFilename()))
      {
        $list .= '<li'.($pageName == $file->getFilename() ? ' class="current"' : '').'>';

        // Humanize file name to display on the list.
        $name = ucwords(str_replace(array('.html', '_', '-'), array('', ' ', ' '), $file->getFilename()));

        $list .= '<a href="'.$file->getFilename().'">'.$name.'</a></li>';
      }
    }

    $list .= '</ul>';

    return self::countPages() > 1 ? $list : '';
  }

  /**
   * Appends Frontline assets at the end </head> and </body>.
   *
   * @param   string  Document content
   * @return  string
   */
  public static function install($content, $pageName)
  {
    // Detect indentation style used in the document.
    preg_match('/\n(\s*)\<\/body\>/', $content, $matches);
    $indentation = $matches[1];

    $content = str_replace('</head>', implode(array(
      "\n".$indentation.$indentation.'<link rel="stylesheet" href="frontline/frontline.css">',
      "\n".$indentation.'</head>',
    )), $content);

    $content = str_replace('</body>', implode(array(
      "\n".$indentation.$indentation.self::buildNavigator($pageName),
      "\n".$indentation.'</body>',
    )), $content);

    return $content;
  }

  /**
   * Merges page content with all partials.
   *
   * @param   string  Full filename of file to compile
   * @param   string  Wheter to throw exception if file not found
   * @return  string
   */
  public static function compileFile($filename, $throwError = true)
  {
    // Check if any page exists and if not, throw an Exception.
    if (self::countPages() == 0)
    {
      throw new Exception('There are no pages in project.');
    }

    if (file_exists('../'.$filename))
    {
      $content = file_get_contents('../'.$filename);

      // Automatically include header and footer to the document if not added
      // manually and document is not standalone. This applies only for pages,
      // all partials are ignored.
      if (substr($filename, 0, 1) != '_')
      {
        if (!preg_match('/\{\{#standalone\}\}/', $content))
        {
          if (!preg_match('/\{\{>\sheader\}\}/', $content))
          {
            $content = self::compilePartial('header', false).$content;
          }

          if (!preg_match('/\{\{>\sfooter\}\}/', $content))
          {
            $content = $content.self::compilePartial('footer', false);
          }
        }
        else
        {
          // Remove {{}#standalone}} flag together with all whitespace characters.
          $content = preg_replace('/\s*\{\{\#standalone\}\}\s*/m', '', $content);
        }
      }

      // Include all detected partials.
      $content = preg_replace('/\{\{>\s([a-zA-Z0-9_-]+)\}\}/e', 'self::compilePartial("$1")', $content);

      return $content;
    }
    else if ($throwError)
    {
      throw new Exception('File or partial <strong>'.$filename.'</strong> was not found.');
    }
  }

  /**
   * Wrapper of compileFile() method generating special filename for partials.
   *
   * @param   string  Name of partial to compile
   * @param   string  Wheter to throw exception if partial not found
   * @return  string
   */
  protected static function compilePartial($name, $throwError = true)
  {
    $filename = '_'.$name.'.html';

    return self::compileFile($filename, $throwError);
  }

  /**
   * Counts number of pages (excluding partials) in project.
   *
   * @return  int
   */
  protected static function countPages()
  {
    $count = 0;

    foreach (new DirectoryIterator('..') as $file)
    {
      if (preg_match('/^[^_].*\.html$/', $file->getFilename()))
      {
        $count ++;
      }
    }

    return $count;
  }
}