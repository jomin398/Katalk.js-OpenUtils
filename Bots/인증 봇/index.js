const scriptName = "인증 봇";
const COMPRESS = "\u200b".repeat(500);
const RMaster = ["DEBUG SENDER", "Dr JMH (jomin398)", "호석이"];
var CmdLocked = {};
var Lock = null;
var preRoomName = null;
var 클립보드 = Api.getContext().getSystemService(Api.getContext().CLIPBOARD_SERVICE);
/* 아래에 봇 주인의 본명을 적어주세요.
예시 : var personalRoomName = "홍길동";
예시와 아래가 같은형식이야됩니다.
*/
var personalRoomName = "";
/* 위에다 봇 주인의 본명을 적어주세요. */
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

function login(room, msg, sender, isGroupChat, replier, ImageDB) {
    var loginWaitTime = 5000; //인증대기 시간
    if (msg == "/인증키") {
        CmdLocked = {}; //인증전 리셋
        var Locknum = Math.floor(Math.random() * 999999999);
        Lock = Locknum;
        preRoomName = room;
        var ispreRoom = function(room, preRoomName) {
            return Boolean(room == preRoomName);
        }
        var messagetemp = "/인증 " + Locknum.toString();
        replier.reply("인증키가 클립보드와 개인 톡에 전달되었습니다. 복붙해주세요");
        클립보드.setText(messagetemp)
        java.lang.Thread.sleep(loginWaitTime);
        if (CmdLocked[room] == undefined | CmdLocked[room] !== false) {
            CmdLocked[room] = true;
            replier.reply("인증시간이 초과되었습니다.\n명령어 사용 : " + ((CmdLocked[room]) ? "불가" : "가능"));
            Lock = null;
        }
    }
    if (msg.startsWith("/인증 ") && msg.split(" ")[1] == Lock) {
        if (CmdLocked[room] == undefined | CmdLocked[room] == true) {
            CmdLocked[room] = false;
            Log.i(preRoomName + "에서 인증이 승인되었습니다.");
            java.lang.Thread.sleep(2000)
            replier.reply("인증되었습니다.\n인증결과입니다." + COMPRESS + "\n\n" + sender + " (봇 주인)님은 " + preRoomName + "에서\n명령어를 사용 \"" + ((CmdLocked[room]) ? "불가" : "가능") + "\" 하십니다.");
            Lock = null;
            preRoomName = null;
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
    login(room, msg, sender, isGroupChat, replier, imageDB)
};