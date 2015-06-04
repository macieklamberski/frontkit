# Frontkit

Frontkit is a scaffolding for web projects. It consists of directories structure, base files and Gulp workflow which supports modern web tools like CSS preprocessors, file minificators, image optimizers.

## Structure

Below is tree with directories structure for a typical project. `fonts`, `images`, `sprites`, `icons` and `media` directories are not present in the repository as they not always used in every project. If your project has any of them - just create corresponding directory.

```bash
.
├── bower_components/
├── node_modules/
├── src/
│   ├── templates/
│   ├── scripts/
│   ├── styles/
│   ├── images/
│   ├── sprites/
│   ├── icons/
│   ├── fonts/
│   └── media/
└── ...
```

## Usage

Run below commands in your project directory.

```bash
# This task will watch for changes in files and recompile them as needed.
gulp watch

# Recreate whole project.
gulp build

# Equivalent of 'gulp build && gulp watch'.
gulp

# Running any task with 'dev' parameter with skip time-consuming tasks
# like file minification (JS, CSS) and image optimization. It's helpful
# during development process.
gulp --dev
gulp build --dev
gulp watch --dev

# Deploy changes to defined host (see Configuration section below).
gulp deploy --target=production
```

## Components

Frontkit consists of eight different parts. Each of them is stored in separate directory and managed by different Gulp task (with the same name as directory).

### templates

HTML files compiled using [Twig](http://twig.sensiolabs.org) template engine. Thanks to Twig, templates can be divided into partials and later included in main HTML files. Partials (files with `_` prefix in their name) will not be copied to compiled target. Frontkit uses [Twig.js](https://github.com/justjohn/twig.js) which means you can use basically all the functionalities from its original PHP implementation. At the end, files are prettified with JS Prettify library to ensure consistency in the output.

### scripts

Directory with JavaScript files. Thanks to [`gulp-include`](https://www.npmjs.com/package/gulp-include), you can combine multiple scripts into one using below syntax:

```javascript
//= include relative/path/to/file.js
//= include relative/path/to/directory/*.js
```

### styles

Place for CSS, SCSS and Sass files. SCSS and Sass files are compiled to regular CSS files with [libsass](https://github.com/sass/node-sass). You can use wildcard to import all the files from given directory:

```css
@import 'blocks/*' // Will import all the files in the blocks folder.
```

(@TODO: Info about files being minified and named with .min suffix.)

### images

Images used strictly for layout purposes. Will be optimized using [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin).

### sprites

Thanks to [gulp-svgstore](https://github.com/w0rm/gulp-svgstore), you can combine multiple SVG files into one that can be later used to embed inline SVG shapes in your HTML. Just create directory in /sprites and put SVG files in there. During build process, all files inside this directory will be combined into one with the same name. If you, for example, have `sprites/sprite-name/icon-name.svg`, you'll be able to embed it with below code.

```html
<svg>
  <use xlink:href="images/sprite-name.svg#icon-name"></use>
</svg>
```

### icons

SVG files from which font will be generated. (@TODO: Add more info about how it works.)

### fonts

Font files, also font-based icons.

### media

Images, videos and other media files used as a content.

## Configuration

You can configure Frontkit to do things like deploying and manage output directories. Below is example `frontkit` key in _package.json_ file, located in root directory of the project.

```javascript
// package.json
{
  // ...
  "frontkit": {
    "source": "./src",
    "targets": [
      {
        "path": "_preview",
        "tasks": ["templates", "scripts", "styles", "images", "sprites", "icons", "fonts", "media"]
      }
    ],
    "deploy": {
      "staging": {
        "adapter": "ftp",
        // For configuration of the adapter, read "deploy" section below.
      },
      // ...
    }
  },
  // ...
}
```

### targets

Array of directories to which source will be compiled. `path` points to target directory, `tasks` is array of performed tasks.

### deploy

You can define one or more deploy targets, each with its own set of configuration options.

You can choose of two adapters: [vinyl-ftp](https://github.com/morris/vinyl-ftp) or [gulp-rsync](https://github.com/jerrysu/gulp-rsync). Each of them have different set of configuration options.

To use **vinyl-ftp**, set value of `adapter` to `"ftp"`. To configure this adapter, look [into documentation of the package](https://github.com/morris/vinyl-ftp#ftpcreate-config-). There are also two additional properties: `files` (path to local files) and `destination` (remote directory on the server). Example configuration:

```javascript
"deploy": {
  // ...
  "staging": {
    "adapter": "ftp",
    "host": "staging.domain.com",
    "user": "staging",
    "password": "letmein",
    "destination": "/var/www/staging.domain.com",
    "files": ["dist/**/*", "!dist/.git/"]
  },
  // ...
}
```

To use **gulp-rsync**, set value of `adapter` to `"rsync"` and pass package configuration ([look into documentation](https://github.com/jerrysu/gulp-rsync#rsyncoptions)). There is also one additional property: `files` - path to local files. Example configuration:

```javascript
"deploy": {
  // ...
  "preview": {
    "adapter": "rsync",
    "port": 22,
    "hostname": "domain.com",
    "incremental": true,
    "root": "dist",
    "destination": "/var/www/domain.com",
    "files": ["dist/**/*", "!dist/.git/"]
  },
  // ...
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

For managing front-end dependencies like Bootstrap, jQuery (and plugins), you will need [Bower](http://bower.io), another package manager. Install it from the command line as well:

```bash
npm install -g bower
```

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
