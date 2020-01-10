const express = require('express');
const { Server } = require('ws');
const GameController = require('./GameController');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html'; // TODO: remove

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname })) // TODO: remove
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });
const gameController = new GameController();

wss.on('connection', (ws, req) => {
  console.log('Client connected');
  const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(/\s*,\s*/)[0] : req.connection.remoteAddress;
  gameController.connectToGame(ws, ip);
  ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
  wss.clients.forEach((client) => {
    // client.send(new Date().toTimeString());
  });
}, 1000);
