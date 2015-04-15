# Frontline

Frontline is a scaffolding for web projects. It creates a project structure, files and Grunt tasks which support modern workflows like CSS preprocessors. Built HTML, CSS and JS files are prettified and fully editable so clients can work directly with them if they wish.

## Requirements

The following software needs to be installed if you want to use Frontline. These installations need to be done just once so you can skip this section if you have the software already installed.

First is Node.js, so you can work with `npm`, Node package manager. You can install it from [pre-built installer](http://nodejs.org/) or using Homebrew:

```
brew install node
```

Next is Sass gem:

```
gem install sass
```

You will also need [Jekyll](http://jekyllrb.com) used for creating HTML templates:

```
gem install jekyll
```

Then install [Grunt](http://gruntjs.com/)'s command line interface (CLI) globally:

```
npm install grunt-cli -g
```

For managing certain dependencies like Bootstrap, you will need [Bower](http://bower.io/), another package manager. Install it from the command line too:

```
npm install bower -g
```

Also make sure that [git](http://git-scm.com/) is installed as some bower packages require it to be fetched and installed.

## Structure

- **dist** - production / preview files are automatically generated here, this is where you check your work in a browser
- **node_modules** - Node.js modules for various Grunt tasks, usually you don’t have to do anything about this folder
- **bower_components** - 3rd party libraries managed via [Bower](http://bower.io/)
- **src** - source files, development is done here
  - **fonts** - Font files, also font-based icons
  - **images** - Images used strictly for layout purposes
  - **media** - Other images used as a content
  - **scripts** - JS files (only custom files, plugins and libraries should be added via [Bower](http://bower.io/))
  - **styles** - SCSS files
  - **templates** - directory used for [Jekyll](http://jekyllrb.com) templates and data files

## Usage

Frontline is using Grunt tasks to compile and do other processing (i.e. optimizing images, minifying CSS/JS files). Run `grunt` command in your project directory:

```
grunt
```

This will boot up `watch` task that will watch for changes in files and recompile them as needed.

You can also run `build` task to recreate whole project.

```
grunt build
```
## License

Copyright (C) 2014 Maciej Lamberski

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
