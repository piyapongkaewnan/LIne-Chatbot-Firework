const functions = require("firebase-functions");
const axios = require("axios");

const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message/reply";
const LINE_ACCESS_TOKEN = functions.config().line.channel_access_token;
const LINE_HEADER = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${LINE_ACCESS_TOKEN}`
};

class LineApp {
    async replyMessage(token, payload) {
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
}

module.exports = new LineApp();