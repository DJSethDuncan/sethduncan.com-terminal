var express = require('express')
var router = express.Router()

var codeURL = 'https://www.github.com/DJSethDuncan'
var musicURL = 'https://www.soundcloud.com/sethduncanmusic'
var filePermissionText = '---x------ root root'
var primaryColor = 'lightblue'

var cv = `
Seth Duncan
sethduncan@gmail.com

Engineering Manager
Marchex
February 2015 - Present
`

var helpText = `
Commands:

[[gb;${primaryColor};black]ls]              List files
[[gb;${primaryColor};black]help]            You already know what this does
`

var fileList = {
    code: {
        description: 'Secret software DO NOT OPEN'
    },
    music: {
        description: 'My sick tunes'
    }
}

var hiddenFileList = {
    '.cv': {
        descriptiont: 'My resume'
    }
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
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
      commandResponse.text = 'Loading code...'
      commandResponse.url = codeURL
      break
    case 'music':
      commandResponse.text = 'Loading music...'
      commandResponse.url = musicURL
      break
    case '.cv':
      commandResponse.text = cv
      break
    case 'ls':
      for (file in fileList) {
          commandResponse.text += `[[gb;${primaryColor};black]` + file + `] `
      }
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
