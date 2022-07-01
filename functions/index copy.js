const functions = require("firebase-functions");
const line = require("@line/bot-sdk");
const express = require('express');
const axios = require("axios");
const messages = require('./messages');

const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message/reply";
const LINE_ACCESS_TOKEN = functions.config().line.channel_access_token;
const LINE_HEADER = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${LINE_ACCESS_TOKEN}`
};

const config = {
    channelAccessToken: LINE_ACCESS_TOKEN,
    channelSecret: functions.config().line.channel_secret
}

const app = express();
app.post('/webhook', line.middleware(config), async(req, res) => {
    // console.log('req.body', JSON.stringify(req.body, null, 2));
    const events = req.body.events;
    for (const event of events) {
        if (event.type === "follow") {
            await replyMessage(event.replyToken, messages.debug(req.body));
        } else if (event.type === 'message' && event.message.type === 'text') {
            let textMsg = event.message.text;
            await replyMessage(event.replyToken, messages.flex(`You click ${Home}`));
        } else {
            await replyMessage(event.replyToken, messages.debug(req.body)); //messages.welcome(req.body)
        }
    };
    res.status(200).send(`Done`);
});

exports.api = functions.region('asia-northeast1').https.onRequest(app);

const replyMessage = (token, payload) => {
    return axios({
        method: "POST",
        url: LINE_MESSAGING_API,
        headers: LINE_HEADER,
        data: JSON.stringify({
            replyToken: token,
            messages: [payload]
        })
    });
};