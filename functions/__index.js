const functions = require("firebase-functions");
const axios = require("axios");
const LINE_ACCESS_TOKEN = functions.config().line.channel_access_token;

const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message/reply";
const LINE_HEADER = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${LINE_ACCESS_TOKEN}`
};

exports.webhook = functions.region('asia-northeast1').https.onRequest(async(req, res) => {
    if (req.method === "POST") {
        const events = req.body.events;
        for (const event of events) {
            // if (event.type === "message") {
            //     if (event.message.type !== "text") {
            //         await reply(event.replyToken, { type: "text", text: event.message.type });
            //     } else {
            //         await reply(event.replyToken, { type: "text", text: event.message.text });
            //     }
            // }
            if (event.type === "follow") {
                await reply(event.replyToken, { type: "text", text: 'Welcome' });
            } else {
                await reply(event.replyToken, { type: "text", text: JSON.stringify(req.body) });
            }
        };
    } else {
        return res.status(200).send(`Done`);
    }
});

const reply = (token, payload) => {
    return axios({
        method: "POST",
        url: `${LINE_MESSAGING_API}`,
        headers: LINE_HEADER,
        data: JSON.stringify({
            replyToken: token,
            messages: [payload]
        })
    });
};