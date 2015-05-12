# Frontkit

Frontkit is a scaffolding for web projects. It creates a project structure, files and Gulp workflow which support modern web tools like CSS preprocessors, file minificators, image optimizers. Built HTML, CSS and JS files are prettified and fully editable so clients can work directly with them if they wish.

## Components

Frontkit consists of six different parts. Each of them is stored in separate directory and managed by different Gulp task (with the same name as directory).

### templates

HTML files compiled using [Twig](http://twig.sensiolabs.org) template engine. Thanks to Twig, templates can be divided into partials and later included in main HTML files. Partials (files with `_` prefix in their name) will not be copied to compiled target. Frontkit uses [Twig.js](https://github.com/justjohn/twig.js) which means you can use basically all the functionalities from its original PHP implementation. At the end, files are prettified with JS Prettify library to ensure consistency in the output.

### scripts

Directory with JavaScript files. Those ending with _.min.js_ will be minified using [Uglify](https://github.com/terinjokes/gulp-uglify). It is useful when combining multiple plugins or libraries used later in the application.

Thanks to [`gulp-include`](https://www.npmjs.com/package/gulp-include), you can combine multiple scripts into one using below syntax:

```javascript
//= include relative/path/to/file.js
```

### styles

Place for CSS and SCSS files. SCSS files are compiled to regular CSS files with [libsass](https://github.com/sass/node-sass). Files ending with _.min.css_ will be minified. You can use wildcard to import all the files from given directory:

```css
@import 'blocks/*' // Will import all the files in the blocks folder.
```

### images

Images used strictly for layout purposes. Will be optimized using [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin).

### fonts

Font files, also font-based icons.

### media

Images, videos and other media files used as a content.

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

You can configure Frontkit to do things like deploying and manage output directories. Below is example `options.json` file, located in root directory of the project.

```javascript
{
  "targets": [
    {
      "path": "_preview",
      "tasks": ["scripts", "styles", "images", "fonts", "templates", "media"]
    }
  ],
  "deploy": {
    "adapter": "ftp",
    // For configuration of the adapter, read "deploy" section below.
  }
}
```

### targets

Array of directories to which source will be compiled. `path` points to target directory, `tasks` is array of performed tasks.

### deploy

You can choose of two adapters: [vinyl-ftp](https://github.com/morris/vinyl-ftp) or [gulp-rsync](https://github.com/jerrysu/gulp-rsync). Each of them have different set of configuration options.

To use **vinyl-ftp**, set value of `adapter` to `"ftp"`. To configure this adapter, look [into documentation of the package](https://github.com/morris/vinyl-ftp#ftpcreate-config-). There are also two additional properties: `local` and `remote`, which, as the names suggest, are used to locate local and remote directories. Example configuration:

```javascript
"deploy": {
  "adapter": "ftp",
  "host": "domain.com",
  "user": "domain",
  "password": "letmein",
  "local": "_preview",
  "remote": "/var/www/domain.com"
}
```

To use **gulp-rsync**, set value of `adapter` to `"rsync"` and pass package configuration ([look into documentation](https://github.com/jerrysu/gulp-rsync#rsyncoptions)). Example configuration:

```javascript
"deploy": {
  "adapter": "rsync",
  "root": "_preview",
  "port": 22,
  "hostname": "domain.com",
  "destination": "/var/www/domain.com",
  "incremental": true
}
```

## Requirements

The following software needs to be installed before using Frontkit. These installations need to be done just once so you can skip this section if you have the software already installed.

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
git clone https://github.com/lamberski/frontkit.git new-project
cd new-project
npm install && bower install
```

After that, you're ready to rock! :metal:

## License

(MIT License)

Copyright (C) 2015 Maciej Lamberski

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
