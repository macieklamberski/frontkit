# Frontline

Frontline is a scaffolding for web projects. It creates a project structure, files and Gulp workflow which support modern web tools like CSS preprocessors, file minificators, image optimizers. Built HTML, CSS and JS files are prettified and fully editable so clients can work directly with them if they wish.

## Structure

- **node_modules** - Node.js packages required by Gulp tasks
- **bower_components** - 3rd party libraries managed via Bower
- **static** - preview files, automatically generated here, this is where you check your work in a browser
- **source** - directory with HTML templates
  - **media** - Images, fonts, videos and other media files
  - **scripts** - JS files (only custom files, plugins and libraries should be added via Bower
  - **styles** - SCSS files

## Usage

Run below commands in your project directory.

```bash
# This task will watch for changes in files and recompile them as needed
gulp watch

# Recreate whole project
gulp build

# Equivalent of 'gulp build && gulp watch'
gulp
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
npm install --global gulp
```

For managing certain dependencies like Bootstrap, you will need [Bower](http://bower.io), another package manager. Install it from the command line as well:

```bash
npm install --global bower
```

Also make sure that [Git](http://git-scm.com) is installed as some bower packages require it to be fetched and installed.

## Installation

Having all requirements met, you can set up new project.

```bash
git clone https://github.com/hanverd/frontline.git new-project
cd new-project
npm install && bower install
```

After that, you're ready to rock! :metal:

## License

Copyright (C) 2014 Maciej Lamberski

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
