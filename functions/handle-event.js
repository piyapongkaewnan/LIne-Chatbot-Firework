const LineApp = require('./line-app');
const messages = require('./messages');
const profile = require('./line-profile');

class hendle {
    async handleEvent(req, res, event) {

        this.profile = await profile.get(req);

        switch (event.type) {
            case 'follow':
                return this.handleFollow(req, event);
            case 'unfollow':
                return res.status(400).end();
            case 'message':
                switch (event.message.type) {
                    case 'text':
                        switch (event.message.text) {
                            case 'Home':
                            case 'Login':
                            case 'About':
                                return await LineApp.replyMessage(event.replyToken, messages.flex(`${this.profile.displayName}, You selected -> ${event.message.text}`));
                            default:
                                return this.handleText(req, event);
                        }
                    case 'location':
                        return this.handleText(req, event); //handleLocation(req, event);
                }
            case 'postback':
                return this.handlePostback(req, event);
            default:
                throw new Error(`Unknown event: ${JSON.stringify(event)}`);
        }
    }

    async handleFollow(req, event) {
        return await LineApp.replyMessage(event.replyToken, messages.flex(`Welcome ${this.profile.displayName} , Thanks for Follow us.`)); //messages.welcome(req.body)
    }

    async handleText(req, event) {
        return await LineApp.replyMessage(event.replyToken, messages.flex(JSON.stringify(req.body))); //messages.welcome(req.body)
    }

    async handlePostback(req, event) {
        return await LineApp.replyMessage(event.replyToken, messages.flex(JSON.stringify(req.body))); //debug(req.body)); //messages.welcome(req.body)
    }
}

module.exports = new hendle();