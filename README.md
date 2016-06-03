# Frontkit [![NPM version](https://badge.fury.io/js/frontkit.svg)](http://badge.fury.io/js/frontkit) [![NPM dependiencies](https://david-dm.org/lamberski/frontkit.svg)](https://david-dm.org/lamberski/frontkit)

Frontkit is static site generator. It consists of very opinionated Gulp workflow (with support of modern web tools like Browserify, JavaScript ES6 support, CSS preprocessors, file minificators, image optimizers) and basic directories & files structure that is generated during each project initialization. It was created mainly for my personal use, but if you like it and are keen to use it—I'll be more than happy if you do.

I bet above description haven't been very helpful in understanding what Frontkit actually does, so let's see how to use it.

## Usage

First step is to install the package globally.

```bash
npm install -g frontkit
```

Now that you have it installed, you can initialize new project.

```bash
frontkit new project-name "Project Name"
cd project-name
npm install
gulp
```

Above commands will create *project-name* directory and copy project files there. Next, `cd` to this newly created directory and run `npm install` to install all dependencies, and start up the Gulp workflow using `gulp`. And yeah, that's it—you're ready to rock! :metal:

Second parameter—name of the project—is optional. If not provided, "Project Name" will be inserted into project *README.md* file and in `<title></title>`.

For reference, below is list of all tasks and options that you can pass to your Gulp.

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

# Deploy changes to defined host (see Configuration section further in this
# document).
gulp deploy --target=production
```

## Structure

During project creation, Frontkit will create below structure of files in project directory.

```bash
.
├── node_modules/
├── src/
│   ├── templates/
│   ├── scripts/
│   ├── styles/
│   ├── images/
│   ├── icons/
│   ├── files/
├── .editorconfig
├── .gitignore
├── .jshintrc
├── gulpfile.js
└── package.json
```

I bet you already know what all the files in root directory do (yeah, just pre-configured files for linting, syntax formatting, etc.), so in the next section we'll focus on the contents of *src* directory.

## Tasks

Frontkit *src* folder consists of six main directories (these have their equivalents as Gulp tasks.) Let's find out what kind of stuff can be put to each of them and what will happen if you do this.

### templates

HTML files compiled using [Twig](http://twig.sensiolabs.org) template engine. Thanks to Twig, templates can be divided into partials and later included in main HTML files. Partials (files with *_* prefix in their name) will not be copied to compiled target. Frontkit uses [Twig.js](https://github.com/justjohn/twig.js) which means you can use basically all the functionalities from its original PHP implementation. At the end, files are prettified with JS Prettify library to ensure consistency in the output.

### scripts

Directory with JavaScript files. Frontkit has Browserify support built in, so you can use it out of the box. You can also write JS code using ECMAScript 6 as it's also supported by default.

### styles

Place for CSS, SCSS and Sass files. SCSS and Sass files are compiled to regular CSS files with [libsass](https://github.com/sass/node-sass). You can use wildcard to import all the files from given directory:

```css
@import 'blocks/*' // Will import all the files in the blocks folder.
```

Each compiled file will be automatically minified and named with .min suffix.

### images

Images used strictly for layout purposes. Will be optimized using [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin).

### icons

SVG files from which font will be generated. You can later

### files

Other static files that will be copied to the root of target directory. This is useful for archives, PDFs, etc.

## Configuration

*gulpfile.js* created in your project directory is pre-configured but you can always change it to change behavior of Frontkit.

```javascript
// gulpfile.js
require('frontkit')(require('gulp'), {
  // Directory where all source files are stored.
  "source": "src",

  // List of all targets where Frontkit will compile source files.
  // You can also specify which tasks will be invoked for each target.
  "targets": [
    {
      "path": "dist",
      "tasks": [
        "templates",
        "scripts",
        "styles",
        "images",
        "icons",
        "files"
      ]
    }
  ],

  // For configuration of deploy functionality, read "deploy" section below.
  "deploy": {}
})
```

### targets

Array of directories to which source will be compiled. `path` points to target directory, `tasks` is array of performed tasks.

### deploy

You can define one or more deploy targets, each with its own set of configuration options. You can choose of three adapters: [vinyl-ftp](https://github.com/morris/vinyl-ftp), [gulp-scp2](https://github.com/popomore/gulp-scp2) and [rsync-slim](https://github.com/stcruy/rsync-slim). Each of them have different set of configuration options.

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

To use **gulp-scp2**, set value of `adapter` to `"scp2"` and pass package configuration ([look into documentation](https://github.com/popomore/gulp-scp2#gulp-scp2--)). There is also one additional property: `files` - path to local files. Example configuration:

```javascript
"deploy": {
  // ...
  "preview": {
    "adapter": "scp2",
    "port": 22,
    "host": "domain.com",
    "dest": "/var/www/domain.com",
    "files": ["dist/**/*", "!dist/.git/"]
  },
  // ...
}
```

Using **rsync-slim** is also easy. Set value of `adapter` to `"slim"` and pass package configuration ([look into documentation](https://github.com/stcruy/rsync-slim#rsync-slim)).

```javascript
"deploy": {
  // ...
  "preview": {
    "adapter": "slim",
    "src": ["dist"],
    "dest": "user@domain.com:/path/on/server",
    "options": "-rtvhcz --delete --progress"
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

Then install [Gulp](http://gulpjs.com) globally:

```bash
npm install -g gulp
```

## License

Frontkit is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
