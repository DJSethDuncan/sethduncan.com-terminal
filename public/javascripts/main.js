var primaryColor = 'lightblue'
var splashText = [
    '/******************************************/',
    '/                                          /',
    '/     W E L C O M E   T O                  /',
    '/                                          /',
    '/              sethduncan.com              /',
    '/                                          /',
    '/******************************************/'
].join('\n')
var terminalParams = {
    greetings: `[[;${primaryColor};black]${splashText}]\n\nType [[gb;${primaryColor};black]help] to see the commands.\n`,
    name: 'sethduncan.com',
    prompt: `C:\\> `,
    checkArity: false,
}

$(function() {
    $('#terminal').terminal(function(command, term) {
        term.pause();
        $.post('/cmd', {command: command}).then(function(response) {
            var consoleText = '';
            console.log(response);
            if (response.status == 'ok') {
                if (response.text !== '') {
                    consoleText = response.text;
                }
                if (response.url !== '') {
                    window.open(response.url)
                }
            } else {
                consoleText = 'Unknown command';
            }
            term.echo(`\n${consoleText}`).resume();
        });
    }, terminalParams);
});