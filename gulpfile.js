require('frontkit')({
  "source": "src",
  "targets": [
    {
      "path": "./",
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
  "deploy": {}
})
