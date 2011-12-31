# Frontline

Frontline is a tool that helps with initial Front-End development. It allows to separate page-specific markup from common parts (header, footer), and include them later as partials. This way, one piece of code can be reused in all pages across the project.

The tool also contains basic HTML5, CSS and JS template. It can be of course replaced by custom files.

## Usage

Frontline files must be placed in the Apache directory to be able to execute included PHP script. All *.html* documents should be created in the root directory of project. Each of them can be accessed by typing its name in the browser. *.htaccess* file redirects all requests to a script, which includes partials and sends complete HTML code to browser.

### Partials

Partials are special HTML files that can be included to the page using the syntax `{{> partial-name}}`. To document was identified as partial, its name must start with an underscore - *_name.html*.

If project contains *_start.html* and *_end.html* partials, they will be automatically appended to each page on the top and to the bottom. This can be turned off by inserting `{{# standalone}}` at the beginning of document.

## Syntax

* `{{> header}}` - include partial file named *_header.html*.
* `{{#standalone}}` - flag indicating that *_start.html* and *_end.html* partials will not be automatically included to this document.

Syntax is inspired by **[Mustache](http://mustache.github.com)**, where `{{> name}}` is also syntax for partials. `{{#name}}` is my own invention and it serves as a boolean.

## License

Frontline is dually licensed under the MIT or GPL Version 2.