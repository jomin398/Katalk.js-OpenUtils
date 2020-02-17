const scriptName = "V.A";
/*최종 저작자 jomin398, 호석이, All rights reserved.*/
/* 절대관리자 지정, 봇제작자들*/
const RMaster = ["DEBUG SENDER","Dr JMH (jomin398)", "호석이"];
/* 고인물이 아닌이상 하단부터는 고정해주세요 */
/* 저장경로 최상위 가져오기 */
const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
const baseDir = sdcard+"/"+scriptName;
const COMPRESS = "\u200b".repeat(500);
const botOn = {}; //봇 on/off 관련 객체
const AiOn = {};
const preChat = {}; //도배 방지 구현용
Array.prototype.ranPick = function() {
    let len = this.length
    let ran = (Math.random() * len) | 0
    return this[ran]
}
try {
    var Auto = require("AutoChat");
} catch (e) {
    Log.d("Ai 모듈에러\n\n"+e + " " + e.lineNumber);
    throw new InternalError("Ai 모듈에러\n\n"+ e, "AutoChat_Module", e.lineNumber)
}
function toast(msg, tf) {
    try{
    Api.UIThread(
        function() {
            var toast = android.widget.Toast.makeText(Api.getContext(), msg, android.widget.Toast.LENGTH_LONG);
            toast.show();
        });
    }catch(e){
        Log.d(e + " " + e.lineNumber + "\n\nToast 모듈에러");
    }
};
/*고인물이 아닌이상 이 위 까지 함부로 지우지 말것*/
const roomList = ["DEBUG ROOM", "호석이", "GAME"];

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {
    if (roomList.indexOf(room) != -1) {
        if (preChat[room] == msg) return; //동일한 채팅이 두 번 이상 연속으로 수신되면, 가볍게 무시
        /*명령어 처리*/
        procCmd(room, msg, sender, replier);
        /*봇 on/off 설정*/
        if (botOn[room] == undefined) { // 해당 채팅방의 on/off 여부가 결정되어있지 않으면 on으로 설정
            botOn[room] = false;
        };
        if (botOn[room] == false) { //봇이 꺼진 경우 작동 X
            return;
        };
        try {
        	if(botOn[room] !== undefined&botOn[room] == true){
            Auto.Chatprocess(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId, roomList, scriptName);
            }
        } catch (e) {
            Log.d("Ai 모듈에러\n\n"+e + " " + e.lineNumber);
            replier.reply("Ai 모듈에러\n\n"+e + " " + e.lineNumber);
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
        /*여기다가 계속 추가해주세요!!*/
    } else {
        return;
    }
}
/*관리자 명령어 처리*/
function procCmd(room, msg, sender, replier) {
    /*봇 키는 명령어*/
    if (RMaster.indexOf(sender) != -1 && /\/(봇|bot)/g.test(msg.split(" ")[0])) {
        if (/일어나|\/?on/.test(msg)) {
            //봇을 키는 명령어는 꺼진 상테에서도 작동
            replier.reply("띠리링 켜졌습니다." + sender + " 님!");
            Log.i("\u300E" + scriptName + "\u300F 가\u300E" + sender + "\u300F님으로 인해 " + room + "에서 켜짐")
            botOn[room] = true;
        }
if (/잘자요?|\/?off/.test(msg)) {
            //봇을 키는 명령어는 꺼진 상테에서도 작동
            replier.reply("띠리리 꺼졌습니다." + sender + " 님!");
            Log.i("\u300E" + scriptName + "\u300F 가\u300E" + sender + "\u300F님으로 인해 " + room + "에서 꺼짐")
            botOn[room] = false;
        }
        if (msg.split(" ")[1] == "/DB"){
            var data = Auto.DB.readData(baseDir, room);
            if (data == null){
                Auto.Ai.say("0개입니다.", replier)
            }else{
                Auto.Ai.say(data.split("\n").length + "개입니다.", replier);
            }
        }
    }
    if (botOn[room] == false) { //봇이 꺼진 경우 작동 X
        return;
    }
};