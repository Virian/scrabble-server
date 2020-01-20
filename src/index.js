const express = require('express');
const { Server } = require('ws');
const GameController = require('./GameController');

const PORT = process.env.PORT || 3001;

const server = express().listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });
const gameController = new GameController();

wss.on('connection', (ws, req) => {
  console.log('Client connected');
  // const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(/\s*,\s*/)[0] : req.connection.remoteAddress;
  const ip = req.headers['sec-websocket-key']; // TODO: this should be later removed in favor of line above OR make it dependant on some env variable
  gameController.connectToGame(ws, ip);
  ws.on('close', () => console.log('Client disconnected'));
});
