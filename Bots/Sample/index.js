const scriptName = "V.A";
/*최종 저작자 jomin398, 호석이, All rights reserved.*/
/* 절대관리자 지정, 봇제작자들*/
const RMaster = ["DEBUG SENDER", "Dr JMH (jomin398)", "호석이"];
/* 고인물이 아닌이상 하단부터는 고정해주세요 */
/* 저장경로 최상위 가져오기 */
const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
const baseDir = sdcard + "/" + scriptName;
const COMPRESS = "\u200b".repeat(500);
const botOn = {}; //봇 on/off 관련 객체
const AiOn = {};
const preChat = {}; //도배 방지 구현용
var CmdLocked = {}; //방마다 잠김 여부 저장
var Lock = null; // 인증번호 임시저장
var preRoomName = null; //방이름 임시저장;
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
Array.prototype.ranPick = function() {
    let len = this.length
    let ran = (Math.random() * len) | 0
    return this[ran]
}
try {
    var Auto = require("AutoChat");
} catch (e) {
    Log.d("Ai 모듈에러\n\n" + e + " " + e.lineNumber);
    throw new InternalError("Ai 모듈에러\n\n" + e, "AutoChat_Module", e.lineNumber)
}
const B64 = {
    Decode: function(str) {
        return java.lang.String(android.util.Base64.decode(str, android.util.Base64.DEFAULT), "UTF-8")
    },
    Encode: function(str) {
        return android.util.Base64.encodeToString(java.lang.String(str).getBytes("UTF-8"), android.util.Base64.DEFAULT).trim()
    }
}

function toast(msg, tf) {
    try {
        Api.UIThread(
            function() {
                var toast = android.widget.Toast.makeText(Api.getContext(), msg, android.widget.Toast.LENGTH_LONG);
                toast.show();
            });
    } catch (e) {
        Log.d(e + " " + e.lineNumber + "\n\nToast 모듈에러");
    }
};

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
};
/*고인물이 아닌이상 이 위 까지 함부로 지우지 말것*/
const roomList = ["DEBUG ROOM", "호석이", "GAME"];

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {
    if (roomList.indexOf(room) != -1) {
        if (preChat[room] == msg) return; //동일한 채팅이 두 번 이상 연속으로 수신되면, 가볍게 무시
        /*명령어 처리*/
        login(room, msg, sender, isGroupChat, replier, imageDB);
        procCmd(room, msg, sender, replier);
        /*봇 on/off 설정*/
        if (botOn[room] == undefined) { // 해당 채팅방의 on/off 여부가 결정되어있지 않으면 on으로 설정
            botOn[room] = false;
        };
        if (botOn[room] == false) { //봇이 꺼진 경우 작동 X
            return;
        };
        try {
            if (botOn[room] !== undefined & botOn[room] == true) {
                Auto.Chatprocess(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId, roomList, scriptName);
            }
        } catch (e) {
            Log.d("Ai 모듈에러\n\n" + e + " " + e.lineNumber);
            replier.reply("Ai 모듈에러\n\n" + e + " " + e.lineNumber);
        }
        if (/(안녕|ㅎㅇ)+(하(세요|십니까))?[\?|\!\.]?/.test(msg)) {
            Math.random()
            replier.reply("안녕하세요 " + sender + " 님!");
        };
        if (msg.indexOf("타이머 ") == 0) {
            var num = Number(msg.split(" ")[1].replace(/[^0-9]/g, ""));
            replier.reply("타이머 시작!\n" + num + "초 뒤에 타이머가 종료됩니다!");
            java.lang.Thread.sleep(num * 1000);
            replier.reply(num + "초가 끝났습니다.");
        }
        if (msg == "실검") {
            var data = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=실시간%20검색어").get().select("span.tit") + "";
            data = data.replace(/<[^>]+>/g, "");
            data = data.split("\n");
            var result = "";
            for (var n = 0; n < 20; n++) {
                result += (n + 1) + "위: " + data[n] + "\n";
            }
            replier.reply("[네이버 실시간 검색어 순위]\n보실려면 전체보기를 눌러주세요." + COMPRESS + "\n\n" + result.trim());
        }
        var cmd = msg.split(" ")[0];
        var data = msg.replace(cmd + " ", "");
        if (cmd == "검색") {
            replier.reply("https://m.search.naver.com/search.naver?query=" + data.replace(/ /g, "%20"));
        }
        if (msg == "시간") {
            var result = null;
            try {
                result = require("RTC").GetTime("현재 시간은 오전 h시 m분 s초 입니다.");
            } catch (e) {
                result = "애러가 발생하여 시간을 표시할 수 없습니다." + COMPRESS + "\n\n========= error report =========\n" + e;
            }
            replier.reply(result);
        }
        if (msg == "주사위") {
            var icon = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
            replier.reply(icon[Math.floor(Math.random() * 6)]);
        }
        if (msg.startsWith("Base64")) {
            if (msg.split(" ")[1] == "Encode" && msg.split(" ")[1] !== undefined) {
                try {
                    replier.reply(B64.Encode(msg.split(" ")[3]));
                } catch (e) {
                    replier.reply(e)
                }
            } else if (msg.split(" ")[1] == "Decode" && msg.split(" ")[1] !== undefined) {
                try {
                    replier.reply(B64.Decode(msg.split(" ")[3]));
                } catch (e) {
                    replier.reply(e)
                }
            }
        };
        /*여기다가 계속 추가해주세요!!*/
    } else {
        return;
    }
}
/*관리자 인증처리*/
function login(room, msg, sender, isGroupChat, replier, ImageDB) {
    var loginWaitTime = 5000; //인증대기 시간
    if (msg == "/인증키") {
        CmdLocked = {}; //인증전 리셋
        var Locknum = Math.floor(Math.random() * 999999999);
        Lock = Locknum;
        preRoomName = room; //인증시도하는 방이름 임시 등록;
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
            CmdLocked[preRoomName] = false; // false가 잠김해제인것
            var message = preRoomName + "에서 " + scriptName + "으로 인증이 승인되었습니다.";
            Log.i(message);
            send2Master(message)
            java.lang.Thread.sleep(2000)
            replier.reply("성공적으로 인증되었습니다.\n인증결과입니다." + COMPRESS + "\n\n" + sender + " (봇 주인)님은 " + preRoomName + "에서\n명령어를 사용 \"" + ((CmdLocked[preRoomName]) ? "불가" : "가능") + "\"하십니다.");
            Lock = null;
        }
    }
}
/*관리자 명령어 처리*/
function procCmd(room, msg, sender, replier) {
    /*봇 키는 명령어*/
    if (RMaster.indexOf(sender) != -1 && /\/(봇|bot)/g.test(msg.split(" ")[0])) {
        if (CmdLocked[preRoomName] == false) {
            if (/일어나|\/?on/.test(msg)) {
                //봇을 키는 명령어는 꺼진 상테에서도 작동
                replier.reply("띠리링 켜졌습니다." + sender + " 님!");
                Log.i("\u300E" + scriptName + "\u300F 가\u300E" + sender + "\u300F님으로 인해 " + room + "에서 켜짐")
                botOn[room] = true;
                CmdLocked[preRoomName] = true;
            }
            if (/잘자요?|\/?off/.test(msg)) {
                //봇을 키는 명령어는 꺼진 상테에서도 작동
                replier.reply("띠리리 꺼졌습니다." + sender + " 님!");
                Log.i("\u300E" + scriptName + "\u300F 가\u300E" + sender + "\u300F님으로 인해 " + room + "에서 꺼짐")
                botOn[room] = false;
            }
            if (msg.split(" ")[1] == "/DB") {
                var data = Auto.DB.readData(baseDir, room);
                if (data == null) {
                    Auto.Ai.say("0개입니다.", replier)
                } else {
                    Auto.Ai.say(data.split("\n").length + "개입니다.", replier);
                }
                CmdLocked[preRoomName] = true;
            }
        } else {
            replier.reply("잠깐! 본 기능은 관리자 인증이 필요한 기능입니다.\n관리자 인증을 실행해주세요.");
            Log.i("Access_Denied.\n" + sender + "is Not Admin, is User.\nfrom login");
            throw new RangeError("Access_Denied.\n" + sender + 'is Not Admin, is User', "login");
        }
    }
    if (botOn[room] == false) { //봇이 꺼진 경우 작동 X
        return;
    }
};