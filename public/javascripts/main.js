var primaryColor = 'lightblue'
var terminalParams = {
    greetings: `Welcome to [[gb;${primaryColor};black]sethduncan.com] \n \n`,
    name: 'sethduncan.com',
    prompt: `[[gb;pink;black]$][[gb;purple;black]>] `,
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
            term.echo(`\n${consoleText}\n`).resume();
        });
    }, terminalParams);
});