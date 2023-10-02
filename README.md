TikTokWidgets
==================
A Node.js project to deliver Gift, Subscriber, and Follow notifications to OBS clients via browser source.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white&style=flat-square)](https://www.linkedin.com/in/isaac-kogan-5a45b9193/ )
[![HitCount](https://hits.dwyl.com/isaackogan/TikTokWidgets.svg?style=flat)](http://hits.dwyl.com/isaackogan/TikTokLive)
![Issues](https://img.shields.io/github/issues/isaackogan/TikTokWidgets)
![Forks](https://img.shields.io/github/forks/isaackogan/TikTokWidgets)
![Stars](https://img.shields.io/github/stars/isaackogan/TikTokWidgets)
[![Support Server](https://img.shields.io/discord/977648006063091742.svg?color=7289da&logo=discord&style=flat-square)](https://discord.gg/e2XwPNTBBr)

<!-- [![Downloads](https://pepy.tech/badge/tiktoklive)](https://pepy.tech/project/tiktoklive) -->

A Node.js project to receive and decode livestream events such as subscribes and follows and display them as stream widgets in real-time from TikTok's LIVE service by connecting to TikTok's internal WebCast push service. 

This project is a Javascript tool  based off of
[TikTok-Live-Connector](https://github.com/zerodytrash/TikTok-Live-Connector)
by [@zerodytrash](https://github.com/zerodytrash/) meant to serve as a free, open source tool for streamers on the platform.

This is **not** an official product. It is a research project & tinkering tool for streamers.

Join the [community support server](https://discord.gg/e2XwPNTBBr) and visit the `#support` channel for questions, contributions and ideas. Feel free to make pull requests with missing/new features, fixes, etc.

## Getting Started
To run the chat reader locally, feel free to [watch the tutorial](https://www.youtube.com/watch?v=43roE4STKgU) expertly created by [TikTok LIVE with Harry](https://www.youtube.com/channel/UCbaIDsmlBw1XrmxdVxmL_fw)
that will take you through the following steps:


1. Download a code editor like VSCode (not missing this step anymore smh)
2. Install [Node.js](https://nodejs.org/) on your system
3. Clone this repository or download and extract [this ZIP file](https://github.com/isaackogan/TikTokGiftWidget/archive/refs/heads/master.zip)
4. Open a console/terminal in the root directory of the project
5. Enter `npm i` to install all required dependencies
6. Enter `node server.js` to start the application server

Now you should see the following message: `Server running! Please visit http://localhost:8081`<br>
Add `http://localhost:8082` as a bowser source in OBS.

### IMPORTANT: Notice About Sounds

Sounds will not work unless you click/interact with the page first after loading it
due to a browser security feature preventing malicious popups & sounds.

<img src="https://i.imgur.com/JnvK7zF.gif" width=400></img>

## Contributors

* **Isaac Kogan** - *Initial work & primary maintainer* - [isaackogan](https://github.com/isaackogan)
* **Zerody** - *Reverse-Engineering & README.md file* - [Zerody](https://github.com/zerodytrash/)

See also the full list of [contributors](https://github.com/ChromegleApp/Chromegle/contributors) who have participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## GIFT OBJECT

```
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
```


## CHAT OBJECT

```
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
}
```

### SOCIAL OBJECT

```
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
```
