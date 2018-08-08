var sessionId = '';

// name of the client
var name = '';

// socket connection url and port
var socket_url = '127.0.0.1';
var port = '8080';

$(document).ready(function () {
    $("#form_submit, #form_send_message").submit(function (e) {
        e.preventDefault();
        join();
    });
});

var webSocket;

/**
 * Connection to socket
 */
function join() {
    // Checking person name
    if ($('#input_name').val().trim().length <= 0) {
        alert('Enter your name');
    }
    else {
        name = $('#input_name').val().trim();
        $('#prompt_name_container').fadeOut(1000, function () {
            // opening socket connection
            openSocket();
        })
    }
    return false;
}

/**
 * Will open the socket connection
 */
function openSocket() {
    // Ensures only one connection is open at a time
    // ??
    if (webSocket != undefined && webSocket.readyState != webSocket.CLOSED) {
        return;
    }

    // Create a new instance of the websocket
    webSocket = new WebSocket("ws://" + socket_url + ":" + port + "/chat?name=" + name);

    /**
     * Binds function to the listeners for the websocket.
     * @param ev
     */
    webSocket.onopen = function (ev) {
        $('#message_container').fadeIn();

        // ??
        if (ev.data == undefined)
            return;
    };

    webSocket.onmessage = function (ev) {
        // parsing the json data
        parseMessage(ev.data);
    };

    webSocket.onclose = function (ev) {
        alert('Error! Connection is closed. Try connecting again.');
    };
}

/**
 * Sending the chat message to server
 */
function send() {
    var message = $('#input_message').val();
    if (message.trim().length > 0)
        sendMessageToServer('message', message);
    else
        alert('Please enter message to send!');
}

/**
 * Closing the socket connection
 */
function closeSocket() {
    webSocket.close();

    $('#message_container').fadeOut(600, function () {
        $('#prompt_name_container').fadeIn();
        // clearing the name and session id
        sessionId = '';
        name = '';

        // clear the ul li messages
        $('#messages').html('');
        $('p.online_count').hide();
    });
}

/**
 * Parsing the json message. The type of message is identified by 'flag' node
 * value flag can be self, new, message, exit
 * @param message
 */
function parseMessage(message) {
    var jObj = $.parseJSON(message);

    if (jObj.flag == 'self') {
        // if the flag is 'self' message contains the session id
        sessionId = jObj.sessionId;
    }
    else if (jObj.flag == 'new') {
        // if the flag is 'new', a client joined the chat room
        var new_name = 'You';

        // number of people online
        var online_count = jObj.onlineCount;

        $('p.online_count').html(
            'Hello, <span class="green">' + name + '</span>. <b>' + online_count + '</b> people online right now'
        ).fadeIn();

        if (jObj.sessionId != sessionId)
            new_name = jObj.name;

        var li = '<li class="new"><span class="name">' + new_name + '</span>' + jObj.message + '</li>';
        $('#messages').append(li);
        $('#input_message').val('');
    }
    else if (jObj.flag == 'message') {
        // if the json flag is 'message', it means somebody sent the chat message

        var from_name = 'You';

        if (jObj.sessionId != sessionId)
            from_name = jObj.name;

        var li = '<li><span class="name">' + from_name + '</span>' + jObj.message + '</li>';

        // appending the chat message to list
        appendChatMessage(li);

        $('#input_message').val('');
    }
    else if (jObj.flag == 'exit') {
        // is the json flag is 'exit', it means somebody left the chat room
        var li = '<li class="exit"><span class="name red">' + jObj.name + '</span>' + jObj.message + '</li>';

        var online_count = jObj.onlineCount;

        $('p.online_count').html(
            'Hello, <span class="green">' + name + '</span>. <b>' + online_count + '</b> people online right now'
        );

        appendChatMessage(li);
    }
}

/**
 * Appending the chat message to list
 * @param li
 */
function appendChatMessage(li) {
    $('#messages').append(li);

    // scrolling the list bottom so that new message will be visible
    $('#messages').scrollTop($('#messages').height());
}

/**
 * Sending message to socket server message will be in json format
 * @param flag
 * @param message
 */
function sendMessageToServer(flag, message) {
    var json = '{""}';

    // preparing json object
    var myObject = new Object();
    myObject.sessionId = sessionId;
    myObject.message = message;
    myObject.flag = flag;

    // converting json object to json string
    json = JSON.stringify(myObject);

    // sending message to server
    webSocket.send(json);
}