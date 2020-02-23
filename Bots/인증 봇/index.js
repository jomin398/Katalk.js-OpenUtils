const scriptName = "인증 봇";
const COMPRESS = "\u200b".repeat(500);
const RMaster = ["DEBUG SENDER", "Dr JMH (jomin398)", "호석이"];
var CmdLocked = {};
var Lock = null;
var preRoomName = null;
var 클립보드 = Api.getContext().getSystemService(Api.getContext().CLIPBOARD_SERVICE);
/* 유저설정
아래에 봇 주인의 본명을 적어주세요.
예시 : var personalRoomName = "7KGw66+87ZiB";
예시와 아래가 같은형식이야됩니다.
이 변수는 봇 주인의 카톡방 이름을 지정하며
인증이 시도될경우 알림이 발송됩니다.
*/
var MasterRoomName = "7KGw66+87ZiB";
/* 위에다 봇 주인의 본명을 Base 64코드로 인코딩해서 적어주세요.
site : https://www.base64encode.org
아래부터는 디버그 모드 설정입니다.
*/
var debugMode = true;
/*
var debugMode = false;
일땐 MasterRoomName의 개인 톡 방으로
인증 알림이 전송되지 않습니다.
반대로
var debugMode = true;
일땐 알림이 전송됩니다.
알림 기본설정은 false입니다.
반드시 위의 유저설정들을 꼭해주세요*/

var isSendAble = function() {
    try {
        return Boolean(Api.canReply(personalRoomName));
    } catch (e) {
        Log.d("부탁드리고 싶은사항이 있는데요\n성함을 알려주시겠어요. 주인님?\n개인 톡으로 단둘이서 소담을 나누고싶은데요.\n주인님의 개인 톡방 이름을 모르겠어요.\n\n" + e + " " + e.lineNumber);
        throw e + " " + e.lineNumber;
    }
}

function getImageHash(ImageDB) {
    return java.lang.String(ImageDB.getProfileImage()).hashCode();
}

const B64 = {
    Decode: function(str) {
        return java.lang.String(android.util.Base64.decode(str, android.util.Base64.DEFAULT), "UTF-8")
    },
    Encode: function(str) {
        return android.util.Base64.encodeToString(java.lang.String(str).getBytes("UTF-8"), android.util.Base64.DEFAULT).trim()
    }
}

function send2Master(msgstr) {
    /*봇 주인에게 메시지 보내는 함수*/
    if (debugMode == true || debugMode === undefined) {
        try {
            Api.replyRoom(B64.Decode(MasterRoomName), msgstr, false)
        } catch (e) {
            Log.d("부탁드리고 싶은사항이 있는데요\n성함을 알려주시겠어요. 주인님?\n개인 톡으로 단둘이서 소담을 나누고싶은데요.\n주인님의 개인 톡방 이름을 모르겠어요.\n\n" + e + " " + e.lineNumber);
            throw e + " " + e.lineNumber;
        }
    }
}

function login(room, msg, sender, isGroupChat, replier, ImageDB) {
    var loginWaitTime = 5000; //인증대기 시간
    if (msg == "/인증키") {
        CmdLocked = {}; //인증전 리셋
        var Locknum = Math.floor(Math.random() * 999999999);
        Lock = Locknum;
        preRoomName = room;
        var messagetemp = "/인증 " + Locknum.toString();
        var logintrymsg = preRoomName + " 에서 " + scriptName + " 으로 인증시도가 확인되었습니다.";
        Log.i(logintrymsg);
        send2Master(logintrymsg);
        클립보드.setText(messagetemp);
        java.lang.Thread.sleep(3000); //인증전 경고 지연
        send2Master(messagetemp);
        replier.reply("인증키가 클립보드와 개인 톡에 전달되었습니다. 복붙해주세요");

        java.lang.Thread.sleep(loginWaitTime);
        if (CmdLocked[preRoomName] == undefined | CmdLocked[preRoomName] !== false) {
            CmdLocked[preRoomName] = true;
            replier.reply("인증시간이 초과되었습니다.\n명령어 사용 : " + ((CmdLocked[preRoomName]) ? "불가" : "가능"));
            Lock = null;
        }
    }
    if (msg.startsWith("/인증 ") && msg.split(" ")[1] == Lock) {
        if (CmdLocked[preRoomName] == undefined | CmdLocked[preRoomName] == true) {
            CmdLocked[preRoomName] = false;
            var message = preRoomName + "에서 " + scriptName + "으로 인증이 승인되었습니다.";
            Log.i(message);
            send2Master(message)
            java.lang.Thread.sleep(2000)
            replier.reply("성공적으로 인증되었습니다.\n인증결과입니다." + COMPRESS + "\n\n" + sender + " (봇 주인)님은 " + preRoomName + "에서\n명령어를 사용 \"" + ((CmdLocked[preRoomName]) ? "불가" : "가능") + "\"하십니다.");
            Lock = null;
        }
    }
}

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    /*
     *(string) room
     *(string) sender
     *(boolean) isGroupChat
     *(function) replier.reply(message)
     *(function) replier.reply(room, message, hideErrorToast = false)
     *(function) imageDB.getProfileBase64()
     *(string) packageName
     */
    login(room, msg, sender, isGroupChat, replier, imageDB);
}