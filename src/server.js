"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var http = require("http");
var fs = require("fs");
var WebSocket = require("ws");
var config = require("config");
var PORT = 3000;
var httpsOptions = {
    key: fs.readFileSync('./config/key.pem'),
    cert: fs.readFileSync('./config/cert.pem')
};
var server = http.createServer(app_1["default"]);
var wss = new WebSocket.Server({ server: server });
var dbConfig = config.get('Customer.dbConfig');
console.log(dbConfig.host);
wss.on('connection', function (ws, req) {
    ws.id = req.headers['sec-websocket-key'];
    //connection is up, let's add a simple simple event
    ws.on('message', function (msg) {
        //log the received message and send it back to the client
        // console.log('received: %s', message);
        // ws.send(`Hello, you sent -> ${message}`);
        var message = JSON.parse(msg);
        setTimeout(function () {
            if (message.isBroadcast) {
                //send back the message to the other clients
                wss.clients
                    .forEach(function (client) {
                    var test = client;
                    console.log(test.id);
                    if (client != ws) {
                        client.send(createMessage(message.content, true, message.sender));
                    }
                });
            }
            ws.send(createMessage("You sent -> " + message.content, message.isBroadcast));
        }, 1000);
    });
    //send immediatly a feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server');
    ws.on('error', function (err) {
        console.warn("Client disconnected - reason: " + err);
    });
});
server.listen(PORT, function () {
    console.log('Express server listening on port ' + PORT);
});
function createMessage(content, isBroadcast, sender) {
    if (isBroadcast === void 0) { isBroadcast = false; }
    if (sender === void 0) { sender = 'NS'; }
    return JSON.stringify(new Message(content, isBroadcast, sender));
}
var Message = /** @class */ (function () {
    function Message(content, isBroadcast, sender) {
        if (isBroadcast === void 0) { isBroadcast = false; }
        this.content = content;
        this.isBroadcast = isBroadcast;
        this.sender = sender;
    }
    return Message;
}());
exports.Message = Message;
