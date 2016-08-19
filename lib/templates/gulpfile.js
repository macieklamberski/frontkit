require('frontkit')(require('gulp'), {
  "source": "src",
  "targets": [
    {
      "path": "dist",
      "tasks": [
        "templates",
        "scripts",
        "styles",
        "images",
        "icons",
        "sprites",
        "files"
      ]
    }
  ],
  "deploy": {}
})
