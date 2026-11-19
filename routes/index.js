var express = require('express')
var router = express.Router()

var codeURL = 'https://www.github.com/DJSethDuncan'
var musicURL = 'https://www.soundcloud.com/sethduncanmusic'
var blogURL = 'https://blog.sethduncan.com'
var marioURL = 'https://blog.sethduncan.com/mario'
var filePermissionText = '---x------ root root'
var primaryColor = 'lightblue'

var cv = `
Seth Duncan
sethduncan@gmail.com

Engineering Manager
Marchex
February 2015 - Present
`

var sethrc = `
alias example='example'
`

var helpText = `
Commands:

[[gb;${primaryColor};black]dir]             Displays directory of files and directories stored on disk
[[gb;${primaryColor};black]cat <file>]      Displays the contents of a file
[[gb;${primaryColor};black]<file>]          Runs a file
[[gb;${primaryColor};black]help]            You already know what this does
`

// contents: printed by `cat <file>`, and by `<file>` when there is no url
// url: opened by `<file>`
var files = {
    '.sethrc': {
        contents: sethrc,
        hidden: true
    },
    '.blog': {
        contents: 'My blog',
        url: blogURL,
        hidden: true
    },
    '.mario': {
        contents: 'Mario',
        url: marioURL,
        hidden: true
    },
    'code.exe': {
        contents: 'Secret software DO NOT OPEN',
        url: codeURL
    },
    'music.exe': {
        contents: 'My sick tunes',
        url: musicURL
    },
    'resume.bat': {
        contents: cv
    }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'sethduncan.com' })
})

router.post('/cmd', function(req, res, next) {
  try {
    var responseData = processCommand(req.body.command)
    res.json(responseData)
  } catch (err) {
    console.error(err)
  }
})

// functions

// matches "music.exe" and "music"
function findFile (name) {
  return Object.keys(files).find(function (fileName) {
    return fileName === name || fileName.replace(/(.)\.[^.]+$/, '$1') === name
  })
}

function listFiles (includeHidden) {
  return Object.keys(files).filter(function (fileName) {
    return includeHidden || !files[fileName].hidden
  })
}

function longListing (fileNames) {
  return fileNames.map(function (fileName) {
    return filePermissionText + ` May 24 00:41 [[gb;${primaryColor};black]` + fileName + `]\n`
  }).join('')
}

function processCommand (command) {

  command = command.trim()

  var commandResponse = {
    'status': 'ok',
    'data': [],
    'text': '',
    'url': ''
  }

  var args = command.split(/\s+/)

  switch (command) {
    case 'help':
      commandResponse.text = helpText
      break
    case 'dir':
    case 'ls':
      var visibleFiles = listFiles(false)
      commandResponse.text = visibleFiles.map(function (fileName) {
        return '05/30/2021 02:33 PM      ' + fileName + '\n'
      }).join('')
      commandResponse.text += '         ' + visibleFiles.length + ' File(s)       1,984 bytes'
      break
    case 'ls -l':
      commandResponse.text = longListing(listFiles(false))
      break
    case 'ls -la':
      commandResponse.text = longListing(listFiles(true))
      break
    default:
      if (args[0] === 'cat' && args.length === 2) {
        var catFile = findFile(args[1])
        commandResponse.text = catFile ? files[catFile].contents : 'cat: ' + args[1] + ': No such file'
      } else if (findFile(command)) {
        var file = files[findFile(command)]
        if (file.url) {
          commandResponse.text = 'Loading ' + command.replace(/^\./, '').replace(/(.)\.[^.]+$/, '$1') + '...'
          commandResponse.url = file.url
        } else {
          commandResponse.text = file.contents
        }
      } else {
        commandResponse.text = 'Unknown command "' + command + '"'
      }
      break
  }

  return commandResponse
}

module.exports = router
