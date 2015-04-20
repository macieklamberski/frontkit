# Frontline

Frontline is a scaffolding for web projects. It creates a project structure, files and Gulp workflow which support modern web tools like CSS preprocessors, file minificators, image optimizers. Built HTML, CSS and JS files are prettified and fully editable so clients can work directly with them if they wish.

## Structure

- **node_modules**—Node.js packages required by Gulp tasks.
- **bower_components**—3rd party libraries managed via Bower.
- **preview**—automatically generated preview files, this is where you check your work in a browser.
- **source**—directory with source files.
  - **fonts**—Font files, also font-based icons.
  - **images**—Images used strictly for layout purposes (will be optimized).
  - **media**—Images, videos and other media files used as a content (won't be copied to CMS theme).
  - **scripts**—JS files (these ending with _.min.js_ will be minified).
  - **styles**—SCSS files (these ending with _.min.css_ will be minified).
  - **\*.html**—template files compiled using Twig template engine.

## Usage

Run below commands in your project directory.

```bash
# This task will watch for changes in files and recompile them as needed.
gulp watch

# Recreate whole project.
gulp build

# Equivalent of 'gulp build && gulp watch'.
gulp
```

## Configuration

You can configure Frontline to do additional things like deploying and copying compiled assets to CMS theme. Below is example `options.json` file, located in root directory of the project.

```javascript
{
  "theme": "wordpress/wp-content/themes/frontline",
  "deploy": {
    "adapter": "ftp",
    // For configuration of the adapter, read "deploy" section below.
  }
}
```

### theme

Path to directory root (where assets will be copied) or `false` to disable it.

### deploy

You can choose of two adapters: [vinyl-ftp](https://github.com/morris/vinyl-ftp) or [gulp-rsync](https://github.com/jerrysu/gulp-rsync). Each of them have different set of configuration options.

To use **vinyl-ftp**, set value of `adapter` to `"ftp"`. To configure this adapter, look [into documentation of the package](https://github.com/morris/vinyl-ftp#ftpcreate-config-). There are also two additional properties: `local` and `remote`, which, as the names suggest, are used to locate local and remote directories. Example configuration:

```javascript
"deploy": {
  "adapter": "ftp",
  "host": "frontline.com",
  "user": "frontline",
  "password": "letmein",
  "local": "preview/**/*",
  "remote": "/var/www/frontline.com"
}
```

To use **gulp-rsync**, set value of `adapter` to `"rsync"` and pass package configuration ([look into documentation](https://github.com/jerrysu/gulp-rsync#rsyncoptions)). Example configuration:

```javascript
"deploy": {
  "adapter": "rsync",
  "root": "preview",
  "port": 22,
  "hostname": "frontline.com",
  "destination": "/var/www/frontline.com",
  "incremental": true
}
```

## Requirements

The following software needs to be installed before using Frontline. These installations need to be done just once so you can skip this section if you have the software already installed.

First is Node.js, so you can work with `npm`, Node package manager. You can install it from [pre-built installer](http://nodejs.org) or using Homebrew:

```bash
brew install node
```

Next is [Sass](http://sass-lang.com) gem:

```bash
gem install sass
```

Then install [Gulp](http://gulpjs.com) globally:

```bash
npm install -g gulp
```

For managing certain dependencies like Bootstrap, you will need [Bower](http://bower.io), another package manager. Install it from the command line as well:

```bash
npm install -g bower
```

Also make sure that [Git](http://git-scm.com) is installed as some bower packages require it to be fetched and installed.

## Installation

Having all requirements met, you can set up new project.

```bash
git clone https://github.com/lamberski/frontline.git new-project
cd new-project
npm install && bower install
```

After that, you're ready to rock! :metal:

## License (MIT License)

Copyright (C) 2015 Maciej Lamberski

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
