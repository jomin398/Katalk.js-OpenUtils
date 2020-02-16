const scriptName = "V.A";
/*최종 저작자 jomin398, All rights reserved.*/
/* 절대관리자 지정, 봇제작자들*/
const RMaster = ["Dr JMH (jomin398)","호석이"];
/* 고인물이 아닌이상 하단부터는 고정해주세요 */
/* 저장경로 최상위 가져오기 */
const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
const COMPRESS = "\u200b".repeat(500);
const botOn = {}; //봇 on/off 관련 객체
const preChat = {}; //도배 방지 구현용
Array.prototype.ranPick = function (){
    let len = this.length
    let ran = (Math.random()*len)|0
    return this[ran]
}

module.exports = {
    /* 본소스는 DarkTonado 님의 DB 소스를 활용했습니다*/
    DB: {
        SaveData: function(savPath, msg) { //파일에 내용을 저장하는 함수
            try { //사실, 나도 어디서 긁어와서 이곳저곳에서 사용하는 거임
                var file = new java.io.File(savPath);
                if (!file.exists()) {
                    file.mkdirs()
                }
                var fos = new java.io.FileOutputStream(file);
                var str = new java.lang.String(msg);
                fos.write(str.getBytes());
                fos.close();
                Log.info("파일 작성 성공");
            } catch (e) {
                Log.debug(e + ", " + e.lineNumber);
            }
        },
        CreateDir: function() { //배운 채팅들이 저장될 폴더를 만드는 함수
            var folder = new java.io.File(sdcard + "/" + SaveFilename + "/"); //File 인스턴스 생성
            folder.mkdirs(); //폴더 생성
        },
        ReadData: function(name) { //파일에 저장된 내용을 불러오는 함수
            try { //사실, 나도 어디서 긁어와서 이곳저곳에서 사용하는 거임
                var file = new java.io.File(sdcard + "/" + SaveFilename + "/" + name + ".txt");
                if (!file.exists()) return null;
                var fis = new java.io.FileInputStream(file);
                var isr = new java.io.InputStreamReader(fis);
                var br = new java.io.BufferedReader(isr);
                var str = br.readLine();
                var line = "";
                while ((line = br.readLine()) !== null) {
                    str += "\n" + line;
                }
                fis.close();
                isr.close();
                br.close();
                return str;
            } catch (e) {
                Log.debug(e + ", " + e.lineNumber);
            }
        }
    }
}
/*고인물이 아닌이상 이 위 까지 함부로 지우지 말것*/
const Roomlist = ["DEBUG ROOM", "호석이", "GAME"];
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    if (Roomlist.indexOf(room) != -1) {
        if (preChat[room] == msg) return; //동일한 채팅이 두 번 이상 연속으로 수신되면, 가볍게 무시

        /*명령어 처리*/
        procCmd(room, msg, sender, replier);
        /*봇 on/off 설정*/
        if (botOn[room] == undefined) { // 해당 채팅방의 on/off 여부가 결정되어있지 않으면 on으로 설정
            botOn[room] = true;
        };
        if (botOn[room] == false) { //봇이 꺼진 경우 작동 X
            return;
        };

        if (/[안녕|ㅎㅇ]+(하(세요|십니까))?[\?|\!\.]?/.test(msg)){
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
            replier.reply("[네이버 실시간 검색어 순위]\n보실려면 전체보기를 눌러주세요."+COMPRESS+"\n\n"+ result.trim());
        }
        var cmd = msg.split(" ")[0];
        var data = msg.replace(cmd + " ", "");
        if (cmd == "검색") {
            replier.reply("https://m.search.naver.com/search.naver?query=" + data.replace(/ /g, "%20"));
        }
        if (msg == "시간") {
            var result = null;
            try{result = require("RTC").GetTime("현재 시간은 오전 h시 m분 s초 입니다.");
            }catch(e){
                result = "애러가 발생하여 시간을 표시할 수 없습니다."+COMPRESS+"\n\n========= error report =========\n"+e;
            }
            replier.reply(result);
        }
        /*여기다가 계속 추가해주세요!!*/
    }else{
        return;
    }
}

/*관리자 명령어 처리*/
function procCmd(room, msg, sender, replier) {
    /*봇 키는 명령어*/
    if (RMaster.indexOf(sender) != -1 && msg.split(" ")[0] == "봇"){
        if(/일어나|\/?on/.test(msg)){
            //봇을 키는 명령어는 꺼진 상테에서도 작동
            replier.reply("띠리링 켜졌습니다." + sender + " 님!");
            Log.i("\u300E"+scriptName+"\u300F 가\u300E"+sender+"\u300F님으로 인해 "+room+"에서 켜짐")
            botOn[room] = true;
        }else if(/잘자요?|\/?off/.test(msg)){
            //봇을 키는 명령어는 꺼진 상테에서도 작동
            replier.reply("띠리리 꺼졌습니다." + sender + " 님!");
            Log.i("\u300E"+scriptName+"\u300F 가\u300E"+sender+"\u300F님으로 인해 "+room+"에서 꺼짐")
            botOn[room] = false;
        }
    }

    if (botOn[room] == false) { //봇이 꺼진 경우 작동 X
        return;
    }
};