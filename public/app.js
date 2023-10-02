/**
 * Wrapper for client-side TikTok connection over Socket.IO
 * With reconnect functionality.
 */
class TikTokIOConnection {
    constructor(backendUrl) {
        this.socket = io(backendUrl);
        this.uniqueId = null;
        this.options = null;

        this.socket.on('connect', () => {
            Logger.DEBUG("Socket connected!");

            // Reconnect to streamer if uniqueId already set
            if (this.uniqueId) {
                this.setUniqueId();
            }
        })

        this.socket.on('disconnect', () => {
            Logger.DEBUG("Socket disconnected!");
        })

        this.socket.on('streamEnd', () => {
            Logger.DEBUG("LIVE has ended!");
            this.uniqueId = null;
        })

        this.socket.on('tiktokDisconnected', (errMsg) => {
            Logger.WARNING(errMsg);
            if (errMsg && errMsg.includes('LIVE has ended')) {
                this.uniqueId = null;
            }
        });
    }

    connect(uniqueId, options) {
        this.uniqueId = uniqueId;
        this.options = options || {};

        this.setUniqueId();

        return new Promise((resolve, reject) => {
            this.socket.once('tiktokConnected', resolve);
            this.socket.once('tiktokDisconnected', reject);

            setTimeout(() => {
                reject('Connection Timeout');
            }, 15000)
        })
    }

    setUniqueId() {
        this.socket.emit('setUniqueId', this.uniqueId, this.options);
    }

    on(eventName, eventHandler) {
        this.socket.on(eventName, eventHandler);
    }
}


let connection = new TikTokIOConnection();


let Config = {

    firstConnect: true,

    updateConfig() {

        fetch("/config.json").then((response) => response.json()).then((json) => {
            Config = Object.assign({}, Config, json);

            if (this.firstConnect) {
                Logger.INFO("Connecting to %s...", Config["uniqueId"]);
                connection.connect(Config["uniqueId"], {enableExtendedGiftInfo: true})
                    .then(state => Logger.INFO("Connected to roomId %s", state["roomId"]))
                    .catch(errorMessage => Logger.ERROR("Failed to connect: \n\n %s", errorMessage));
                this.firstConnect = false;
            }

            setTimeout(Config.updateConfig, 1000);

        });
    }

}

Config.updateConfig();

class Announcement {

    #uniqueId;
    #imageUrl;
    #message;
    #soundUrl;
    #circleCrop;

    constructor(uniqueId, imageUrl, message, soundUrl, circleCrop = false) {
        this.#uniqueId = uniqueId;
        this.#imageUrl = imageUrl;
        this.#message = message;
        this.#soundUrl = soundUrl;
        this.#circleCrop = circleCrop;
    }

    static #getAnimatedLetters(name, _html = "") {

        for (let letter of name.split("")) {
            _html += `<span class="animated-letter wiggle" style="color: ${Config["nameColour"]}; white-space: nowrap;">${letter}</span>`
        }

        return _html;

    }

    build() {

        return `
            
            <div class="alertContainer current" style="
                animation: fadein ${Config["fadeIn"] || 0}ms, fadeout ${Config["fadeOut"] || 0}ms; 
                animation-delay: 0ms, ${Config["fadeAfter"]}ms;
                animation-fill-mode: forwards;
                font-size: ${Config["fontSize"] + "px"};
                white-space: nowrap;
                padding: 20px;
            ">
                <img class="alertImage" src="${this.#imageUrl}" alt="Image" style="border-radius: ${(this.#circleCrop ? 10000 : 0) + "px"}"/>
                <span class="alertText" style="
                    font-weight: ${Config["fontWeight"]};
                    white-space: nowrap;
                    color: ${Config["textColour"] + 'px'};
                ">
                    ${Announcement.#getAnimatedLetters(this.#uniqueId)} ${this.#message}
                </span>
            </div>
        
        `
    }

    sound() {

        if (!this.#soundUrl) {
            return;
        }

        let audio = new Audio(this.#soundUrl);
        audio.volume = Config["volume"];
        audio.play().catch();

    }


}

/*
{
    "giftId": 5655,
    "repeatCount": 1,
    "repeatEnd": true,
    "groupId": "1692513333318",
    "monitorExtra": {
        "from_idc": "maliva",
        "room_id": 7269276013648580000,
        "repeat_end": 1,
        "repeat_count": 1,
        "gift_id": 5655,
        "send_gift_send_message_success_ms": 1692513336705,
        "from_user_id": 6675880965460952000,
        "to_user_id": 7187292886273525000,
        "msg_id": 7269289173839498000,
        "send_gift_profit_core_start_ms": 0,
        "gift_type": 1,
        "anchor_id": 7187292886273525000,
        "log_id": "202308200635307CA022C2510BA096923F"
    },
    "userId": "6675880965460952066",
    "secUid": "MS4wLjABAAAAjIRO93prP2RoUdga4W10vKZfsQ_duwZSw-cP4LJtl_C1NEivt0UHjXkw9jvmYh7x",
    "uniqueId": "01.09mhptmly",
    "nickname": "Rani",
    "profilePictureUrl": "https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/7329426900c1ce0202ec15e5da1b28f2~c5_100x100.webp?x-expires=1692684000&x-signature=cQlMKrjTcfbaMQta0v%2FzH1iPe3E%3D",
    "followRole": 0,
    "userBadges": [],
    "userDetails": {
        "createTime": "0",
        "bioDescription": "",
        "profilePictureUrls": [
            "https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/7329426900c1ce0202ec15e5da1b28f2~tplv-tiktok-shrink:72:72.webp?x-expires=1692684000&x-signature=uhisuQW5N6wU5ESP3rn2q0oVvm8%3D",
            "https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/7329426900c1ce0202ec15e5da1b28f2~c5_100x100.webp?x-expires=1692684000&x-signature=cQlMKrjTcfbaMQta0v%2FzH1iPe3E%3D",
            "https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/7329426900c1ce0202ec15e5da1b28f2~c5_100x100.jpeg?x-expires=1692684000&x-signature=dDwagpabfDOskWTX65qOPlVngAc%3D"
        ]
    },
    "followInfo": {
        "followingCount": 70,
        "followerCount": 76,
        "followStatus": 0,
        "pushStatus": 0
    },
    "isModerator": false,
    "isNewGifter": false,
    "isSubscriber": false,
    "topGifterRank": null,
    "msgId": "7269289173839497990",
    "createTime": "1692513336704",
    "displayType": "webcast_aweme_gift_send_message",
    "label": "{0:user} sent {1:gift} {2:string}",
    "gift": {
        "gift_id": 5655,
        "repeat_count": 1,
        "repeat_end": 1,
        "gift_type": 1
    },
    "describe": "Sent Rose",
    "giftType": 1,
    "diamondCount": 1,
    "giftName": "Rose",
    "giftPictureUrl": "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.png",
    "timestamp": 1692513336705,
    "receiverUserId": "7187292886273524763",
    "extendedGiftInfo": {
        "can_put_in_gift_box": false,
        "color_infos": [],
        "combo": true,
        "describe": "sent Rose",
        "diamond_count": 1,
        "duration": 1000,
        "for_linkmic": true,
        "gift_rank_recommend_info": "",
        "gift_sub_type": 0,
        "gift_vertical_scenarios": [
            0
        ],
        "gold_effect": "",
        "icon": {
            "avg_color": "#53537A",
            "height": 0,
            "image_type": 0,
            "is_animated": false,
            "open_web_url": "",
            "uri": "webcast-va/eba3a9bb85c33e017f3648eaf88d7189",
            "url_list": [
                "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.webp",
                "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.webp"
            ],
            "width": 0
        },
        "id": 5655,
        "image": {
            "avg_color": "#7A5353",
            "height": 0,
            "image_type": 0,
            "is_animated": false,
            "open_web_url": "",
            "uri": "webcast-va/eba3a9bb85c33e017f3648eaf88d7189",
            "url_list": [
                "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.webp",
                "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.webp"
            ],
            "width": 0
        },
        "is_box_gift": false,
        "is_broadcast_gift": false,
        "is_displayed_on_panel": true,
        "is_effect_befview": false,
        "is_random_gift": false,
        "lock_info": {
            "gift_level": 0,
            "lock": false,
            "lock_type": 0
        },
        "name": "Rose",
        "primary_effect_id": 0,
        "tracker_params": {},
        "type": 1
    }
}
*/
connection.on('gift', (data) => {
    console.log(">>> gift", data)

    if (!Config["enabled"]["gift"]) {
        return;
    }

    if (data["giftType"] === 1 && !data["repeatEnd"]) {
        return;
    }

    let announcement = new Announcement(
        data["uniqueId"],
        data["giftPictureUrl"],
        `sent ${data["repeatCount"]}x ${data["giftName"]}`,
        Config["sounds"]["gift"][data["giftName"].toLowerCase()] || Config["sounds"]["gift"]["default"]
    );

    $(".current").replaceWith(announcement.build());
    announcement.sound();

});




/*
{
    "comment": "Novita",
    "userId": "6983977495487185922",
    "secUid": "MS4wLjABAAAA4GHaAS07bvB4ck3pAuOFRf0kwlNSkhao2d5Ts9zKKWHOqYSgnbzRCgzMRGqwirVl",
    "uniqueId": "cancergirllllll5",
    "nickname": "🐣",
    "profilePictureUrl": "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/bd1e150b788adc2695037fb46aa9d469~c5_100x100.webp?x-expires=1692684000&x-signature=kcZnI3IyBJ3fvQ9FBK5hBxsFG6Y%3D",
    "followRole": 0,
    "userBadges": [],
    "userDetails": {
        "createTime": "0",
        "bioDescription": "",
        "profilePictureUrls": [
            "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/bd1e150b788adc2695037fb46aa9d469~tplv-tiktok-shrink:72:72.webp?x-expires=1692684000&x-signature=nly7U99uc1xRMn5uz4gUgbetG%2F8%3D",
            "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/bd1e150b788adc2695037fb46aa9d469~c5_100x100.webp?x-expires=1692684000&x-signature=kcZnI3IyBJ3fvQ9FBK5hBxsFG6Y%3D",
            "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/bd1e150b788adc2695037fb46aa9d469~c5_100x100.jpeg?x-expires=1692684000&x-signature=H0x59mcso0IqsDNhNQAqmTbh9uU%3D"
        ]
    },
    "followInfo": {
        "followingCount": 103,
        "followerCount": 708,
        "followStatus": 0,
        "pushStatus": 0
    },
    "isModerator": false,
    "isNewGifter": false,
    "isSubscriber": false,
    "topGifterRank": null,
    "msgId": "7269288778833267462",
    "createTime": "1692513196281"
}*/
connection.on("chat", (data) => {
    console.log(">>> chat", data)
})


/*
{
    "userId": "6902843029880964101",
    "secUid": "MS4wLjABAAAAj6sVf_rSTtKQU3-RgZ29X9jVVHB4wcZTM5SjPjui1DrejFXClPPfMybOIzyp7Jb1",
    "uniqueId": "monsieur_maximo",
    "nickname": "Max",
    "profilePictureUrl": "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/56bc4689042c9803480d5040ef8f326f~c5_100x100.webp?x-expires=1692684000&x-signature=I0qtkhf5WrfdfSCLpU0P3MfYw6w%3D",
    "followRole": 1,
    "userBadges": [],
    "userDetails": {
        "createTime": "0",
        "bioDescription": "",
        "profilePictureUrls": [
            "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/56bc4689042c9803480d5040ef8f326f~tplv-tiktok-shrink:72:72.webp?x-expires=1692684000&x-signature=hWS7j2SERcL83iHzT0Wa5177a2w%3D",
            "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/56bc4689042c9803480d5040ef8f326f~c5_100x100.webp?x-expires=1692684000&x-signature=I0qtkhf5WrfdfSCLpU0P3MfYw6w%3D",
            "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/56bc4689042c9803480d5040ef8f326f~c5_100x100.jpeg?x-expires=1692684000&x-signature=01Hndp7nNv%2BVOwKopVzDYtERZL4%3D"
        ]
    },
    "followInfo": {
        "followingCount": 218,
        "followerCount": 60,
        "followStatus": 1,
        "pushStatus": 0
    },
    "isModerator": false,
    "isNewGifter": false,
    "isSubscriber": false,
    "topGifterRank": null,
    "msgId": "7269289217805732613",
    "createTime": "1692513287951",
    "displayType": "pm_main_follow_message_viewer_2",
    "label": "{0:user} followed the LIVE creator"
}
*/
const followed = {}
connection.on("social", (data) => {
    console.log(">>> social", data)
    
    if (!Config["enabled"]["follow"]) {
        return;
    }

    if (!data["displayType"].includes("follow")) {
        return;
    }

    if (followed[data["uniqueId"]] && Config["firstFollowOnly"]) {
        return;
    }

    followed[data["uniqueId"]] = true;

    let announcement = new Announcement(
        data["uniqueId"],
        data["profilePictureUrl"],
        `is now following!`,
        Config["sounds"]["follow"] || null,
        true
    );

    $(".current").replaceWith(announcement.build());
    announcement.sound();

})

connection.on("subscribe", (data) => {
    console.log(">>> subscribe", data)

    if (!Config["enabled"]["subscribe"]) {
        return;
    }

    let announcement = new Announcement(
        data["uniqueId"],
        data["profilePictureUrl"],
        `just subscribed!`,
        Config["sounds"]["subscribe"] || null,
        true
    )

    $(".current").replaceWith(announcement.build());
    announcement.sound();

})
