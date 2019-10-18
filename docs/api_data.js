define({ "api": [
  {
    "type": "get",
    "url": "/ok",
    "title": "Check if the server is up",
    "name": "ok",
    "group": "App",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Your server is up and ready\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/index.js",
    "groupTitle": "App"
  },
  {
    "type": "delete",
    "url": "/library/:artist/:albul",
    "title": "Delete the album folder",
    "name": "deleteAlbum",
    "group": "Management",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"The folder has been deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal server error\n{\n  \"status\": \"error\"\n  \"message\": \"Internal server error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/management/management.controllers.js",
    "groupTitle": "Management"
  },
  {
    "type": "delete",
    "url": "/library/:artist",
    "title": "Delete the artist folder",
    "name": "deleteArtist",
    "group": "Management",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"The folder has been deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal server error\n{\n  \"status\": \"error\"\n  \"message\": \"Internal server error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/management/management.controllers.js",
    "groupTitle": "Management"
  },
  {
    "type": "delete",
    "url": "/library/:artist/:album/:file",
    "title": "Delete the file",
    "name": "deleteFile",
    "group": "Management",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"The file has been deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal server error\n{\n  \"status\": \"error\"\n  \"message\": \"Internal server error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/management/management.controllers.js",
    "groupTitle": "Management"
  },
  {
    "type": "delete",
    "url": "/library",
    "title": "Delete all the content of the library",
    "name": "deleteLibrary",
    "group": "Management",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"The folder has been deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal server error\n{\n  \"status\": \"error\"\n  \"message\": \"Internal server error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/management/management.controllers.js",
    "groupTitle": "Management"
  },
  {
    "type": "post",
    "url": "/import",
    "title": "Import a mp3 file from a url",
    "name": "importSong",
    "group": "Management",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "multipart/form-data",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "songUrl",
            "description": "<p>Music mp3 file url.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"status\":\"success\",\n  \"message\":\"You successfully uploaded your song\",\n  \"data\": {\n    \"title\":\"Wild Stare\",\n    \"artist\":\"Giant Rooks\",\n    \"album\":\"Wild Stare\",\n    \"album_artist\":\"Giant Rooks\",\n    \"track\":\"1\",\n    \"date\":\"2018\",\n    \"genre\":\"Rock\",\n    \"encoder\":\"Lavf57.83.100\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": \"error\",\n  \"message\": \"Something went wrong, please make sure you have selected a file.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/management/management.controllers.js",
    "groupTitle": "Management"
  },
  {
    "type": "post",
    "url": "/upload",
    "title": "Upload a mp3 file",
    "name": "uploadSong",
    "group": "Management",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "multipart/form-data",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "songFile",
            "description": "<p>Music mp3 file.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"status\":\"success\",\n  \"message\":\"You successfully uploaded your song\",\n  \"data\": {\n    \"title\":\"Wild Stare\",\n    \"artist\":\"Giant Rooks\",\n    \"album\":\"Wild Stare\",\n    \"album_artist\":\"Giant Rooks\",\n    \"track\":\"1\",\n    \"date\":\"2018\",\n    \"genre\":\"Rock\",\n    \"encoder\":\"Lavf57.83.100\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": \"error\",\n  \"message\": \"Something went wrong, please make sure you have selected a file.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/management/management.controllers.js",
    "groupTitle": "Management"
  },
  {
    "type": "post",
    "url": "/upload/many",
    "title": "Upload some mp3 files",
    "name": "uploadSongs",
    "group": "Management",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "multipart/form-data",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "[File]",
            "optional": false,
            "field": "songFiles",
            "description": "<p>Music mp3 files.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 201 Created\n  {\n    \"status\": \"success\",\n    \"message\": \"You successfully uploaded your song\",\n    \"data\": [\n        {\n            \"title\": \"Hunger\",\n            \"artist\": \"The Score\",\n            \"album\": \"Stay\",\n            \"album_artist\": \"The Score\",\n            \"track\": \"5\",\n            \"date\": \"2019\",\n            \"genre\": \"Alternative\",\n            \"encoder\": \"Lavf57.83.100\"\n        },\n        {\n            \"title\": \"Run Like A Rebel\",\n            \"artist\": \"The Score\",\n            \"album\": \"Stay\",\n            \"album_artist\": \"The Score\",\n            \"track\": \"4\",\n            \"date\": \"2019\",\n            \"genre\": \"Alternative\",\n            \"encoder\": \"Lavf57.83.100\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": \"error\",\n  \"message\": \"Something went wrong, please make sure you have selected a file.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/management/management.controllers.js",
    "groupTitle": "Management"
  },
  {
    "type": "get",
    "url": "/library/:artist",
    "title": "Get the albums of the specified artist",
    "name": "albums",
    "group": "Navigation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "artist",
            "description": "<p>The name of the artist</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Successfully retrieved the artists of the library\",\n  \"data\": [\"Dear Future Self (Hands Up)\"]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\"\n  \"message\": \"This artist couldn't be found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/navigation/navigation.controllers.js",
    "groupTitle": "Navigation"
  },
  {
    "type": "get",
    "url": "/library",
    "title": "Get the artists of the library",
    "name": "artists",
    "group": "Navigation",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Successfully retrieved the artists of the library\",\n  \"data\": [\"Fall Out Boy\",\"Fallulah\",\"The Score\"]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal server error\n{\n  \"status\": \"error\"\n  \"message\": \"Internal server error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/navigation/navigation.controllers.js",
    "groupTitle": "Navigation"
  },
  {
    "type": "get",
    "url": "/library/:artist/:album/:file",
    "title": "Download a specified file",
    "name": "file",
    "group": "Navigation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "artist",
            "description": "<p>The name of the artist</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "album",
            "description": "<p>The name of the album</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "file",
            "description": "<p>The name of the file</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/app/navigation/navigation.controllers.js",
    "groupTitle": "Navigation"
  },
  {
    "type": "get",
    "url": "/library/:artist/:album",
    "title": "Get the tracks of the album",
    "name": "tracks",
    "group": "Navigation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "artist",
            "description": "<p>The name of the artist</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "album",
            "description": "<p>The name of the album</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Successfully retrieved the artists of the library\",\n  \"data\": [\"1 - Dear Future Self (Hands Up).mp3\",\"cover.png\"]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\"\n  \"message\": \"This album couldn't be found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/navigation/navigation.controllers.js",
    "groupTitle": "Navigation"
  }
] });
