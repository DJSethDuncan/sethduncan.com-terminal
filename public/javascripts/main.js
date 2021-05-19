var helpText = `
Currently accepted commands:

help          You already know what this does
test          You can guess what this does
test2 <a>     Replies "you've typed '<a>'
clear         Clears the terminal
`

$(function ($, undefined) {
    // TODO make this hit the API with the command instead
    // $('#terminal').terminal(function (command) {
    //     $.ajax({...})
    // }, {
    //     greetings: 'Welcome to sethduncan.com \n \n',
    //     name: 'sethduncan.com',
    //     prompt: 'SD)> '
    // })

    $('#terminal').terminal({
        test: function() {
            this.echo("You've typed 'test'");
        },
        test2: function(value) {
            this.echo("You've typed " + value);
        },
        help: function() {
            this.echo(helpText)
        }
    }, {
        greetings: 'Welcome to sethduncan.com \n \n',
        name: 'sethduncan.com',
        prompt: 'SD)> '
    });
});