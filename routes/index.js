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
[[gb;${primaryColor};black]help]            You already know what this does
`

var fileList = {
    'code.exe': {
        description: 'Secret software DO NOT OPEN'
    },
    'music.exe': {
        description: 'My sick tunes'
    },
    'resume.bat': {
        description: 'My resume'
    }
}

var hiddenFileList = {
    '.sethrc': {
        description: 'Seth console config'
    },
    '.blog': {
        description: 'My blog'
    },
    '.mario': {
        description: 'Mario'
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
function processCommand (command) {

  command = command.trim()
  
  var commandResponse = {
    'status': 'ok',
    'data': [],
    'text': '',
    'url': ''
  }

  switch (command) {
    case 'help':
      commandResponse.text = helpText
      break
    case 'code':
    case 'code.exe':
      commandResponse.text = 'Loading code...'
      commandResponse.url = codeURL
      break
    case 'music':
    case 'music.exe':
      commandResponse.text = 'Loading music...'
      commandResponse.url = musicURL
      break
    case 'resume':
    case 'resume.exe':
      commandResponse.text = cv
      break
    case '.sethrc':
    case 'cat .sethrc':
      commandResponse.text = sethrc
      break
    case '.blog':
      commandResponse.text = 'Loading blog...'
      commandResponse.url = blogURL
      break;
    case '.mario':
      commandResponse.text = 'Loading Mario...'
      commandResponse.url = marioURL
      break;
    case 'dir':
    case 'ls':
      i = 0;
      for (file in fileList) {
          commandResponse.text += '05/30/2021 02:33 PM      ' + file + '\n'
          i++;
      }
      commandResponse.text += '         ' + i + ' File(s)       1,984 bytes';
      break
    case 'ls -l':
      for (file in fileList) {
          commandResponse.text += filePermissionText + ` May 24 00:41 [[gb;${primaryColor};black]` + file + `]\n`
      }
      break
    case 'ls -la':
      for (hiddenFile in hiddenFileList) {
                commandResponse.text += filePermissionText + ` May 24 00:41 [[gb;${primaryColor};black]` + hiddenFile + `]\n`
            }
            for (file in fileList) {
                commandResponse.text += filePermissionText + ` May 24 00:41 [[gb;${primaryColor};black]` + file + `]\n`
            }
      break
    default:
      commandResponse.text = 'Unknown command "' + command + '"'
      break
  }

  return commandResponse
}

module.exports = router
