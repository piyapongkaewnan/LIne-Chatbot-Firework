const functions = require("firebase-functions");
const line = require("@line/bot-sdk");

const client = new line.Client({
    channelAccessToken: functions.config().line.channel_access_token
});

class LineProfile {
    async get(req) {
        const userId = req.body.events[0].source.userId;
        return client.getProfile(userId)
            .then((profile) => {
                return profile;
            })
            .catch((err) => {
                // error handling
                return err;
            });
    }
}

module.exports = new LineProfile();