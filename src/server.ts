import app from './app';
import * as http from 'http';
import * as fs from 'fs';
import * as WebSocket from 'ws';
import * as config from 'config'


var PORT = 3000;

const httpsOptions = {
    key: fs.readFileSync('./config/key.pem'),
    cert: fs.readFileSync('./config/cert.pem')
}



const server = http.createServer( app);
const wss = new WebSocket.Server({ server });
var dbConfig = config.get('Customer.dbConfig');
console.log(dbConfig.host)
PORT = config.get('Customer.port');
wss.on('connection', (ws: any, req) => {
    ws.id = req.headers['sec-websocket-key'];

    //connection is up, let's add a simple simple event
    ws.on('message', (msg: string) => {

        //log the received message and send it back to the client
        // console.log('received: %s', message);
        // ws.send(`Hello, you sent -> ${message}`);

        const message = JSON.parse(msg) as Message;

        setTimeout(() => {
            if (message.isBroadcast) {

                //send back the message to the other clients
                wss.clients
                    .forEach(client => {
                        let test : any = client;
                        console.log(test.id)
                        if (client != ws) {
                            client.send(createMessage(message.content, true, message.sender));
                        }
                    });

            }

            ws.send(createMessage(`You sent -> ${message.content}`, message.isBroadcast));

        }, 1000);
    });

    //send immediatly a feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server');
    ws.on('error', (err) => {
        console.warn(`Client disconnected - reason: ${err}`);
    })
});


server.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})


function createMessage(content: string, isBroadcast = false, sender = 'NS'): string {
    return JSON.stringify(new Message(content, isBroadcast, sender));
}

export class Message {
    constructor(
        public content: string,
        public isBroadcast = false,
        public sender: string
    ) { }
}