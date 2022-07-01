exports.flex = (message = 'Message') => ({
    "type": "flex",
    "altText": "New message",
    "contents": {
        "type": "bubble",
        "direction": "ltr",
        // "header": {
        //     "type": "box",
        //     "layout": "vertical",
        //     "contents": [{
        //         "type": "text",
        //         "text": "Welcome",
        //         "weight": "bold",
        //         "size": "lg",
        //         "align": "center",
        //         "contents": []
        //     }]
        // },
        "hero": {
            "type": "image",
            "url": "https://www.brandbuffet.in.th/wp-content/uploads/2022/01/nt-new-logo-long.png",
            "size": "full",
            "aspectRatio": "25:10",
            "aspectMode": "cover",
            // "action": {
            //     "type": "uri",
            //     "label": "Line",
            //     "uri": "https://linecorp.com/"
            // }
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [{
                "type": "text",
                "text": message,
                "align": "start",
                "size": "sm",
                "wrap": true,
            }]
        },
        // "footer": {
        //     "type": "box",
        //     "layout": "horizontal",
        //     "contents": [{
        //         "type": "button",
        //         "action": {
        //             "type": "uri",
        //             "label": "Click",
        //             "uri": "https://linecorp.com"
        //         },
        //         "color": "#ffe800",
        //         "style": "secondary"
        //     }]
        // }
    }
});

exports.debug = (message = 'Message') => ({
    type: "text",
    text: JSON.stringify(message)
});