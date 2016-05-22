require('frontkit')({
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
        "files"
      ]
    }
  ],
  "deploy": {}
})
