const functions = require("firebase-functions");
const line = require("@line/bot-sdk");
const express = require('express');
const handle = require('./handle-event');

const config = {
    channelAccessToken: functions.config().line.channel_access_token,
    channelSecret: functions.config().line.channel_secret
}

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {

    Promise.all(req.body.events.map(event => {
        return handle.handleEvent(req, res, event);
    }));
    return res.status(200).send(`Done`);
});

exports.api = functions.region('asia-northeast1').https.onRequest(app);