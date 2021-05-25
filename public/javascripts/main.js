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

var codeCommands = {
    "code": function () {
        this.echo('Launching code... \n')
        window.open(codeURL)
    }
}

var musicCommands = {
    "music": function () {
        this.echo('Launching music... \n')
        window.open(musicURL)
    }
}

var terminalCommands = {
    "ls": function (param) {
        var fileOutput = '\n'
        if (param == "-la") {
            for (hiddenFile in hiddenFileList) {
                fileOutput += filePermissionText + ` May 24 00:41 [[gb;${primaryColor};black]` + hiddenFile + `]\n`
            }
            for (file in fileList) {
                fileOutput += filePermissionText + ` May 24 00:41 [[gb;${primaryColor};black]` + file + `]\n`
            }
        } else if (param == "-l") {
            for (file in fileList) {
                fileOutput += filePermissionText + ` May 24 00:41 [[gb;${primaryColor};black]` + file + `]\n`
            }
        } else {
            for (file in fileList) {
                fileOutput += `[[gb;${primaryColor};black]` + file + `] `
            }
            fileOutput += `\n`
        }    
        this.echo(fileOutput)
    },
    '.cv': function () {
        this.echo(cv + '\n\n')
    },
    help: function () {
        this.echo(helpText)
    }
}

var terminalParams = {
    greetings: `Welcome to [[gb;${primaryColor};black]sethduncan.com] \n \n`,
    name: 'sethduncan.com',
    prompt: `[[gb;pink;black]$][[gb;purple;black]>] `,
    checkArity: false
}

Object.assign(terminalCommands, codeCommands)
Object.assign(terminalCommands, musicCommands)

$(function ($, undefined) {
    // TODO make this hit the API with the command instead
    // $('#terminal').terminal(function (command) {
    //     $.ajax({...})
    // }, {
    //     greetings: 'Welcome to sethduncan.com \n \n',
    //     name: 'sethduncan.com',
    //     prompt: 'SD)> '
    // })

    $('#terminal').terminal(terminalCommands, terminalParams)

})