module.exports={
	DB:require("DB"),
    Ai:{
    	DB:require("DB"),
        checkWord:function(que, msg) { //적당히 비슷한 말인지 비교
            var data = msg.split(" "); //수신된 채팅의 어절들 중
            for (var n = 0; n < data.length; n++) { //한 개 이상이 저장된 채팅들에 포함되어 있다면,
                if (que.indexOf(data[n]) != -1) return true; //대강 비슷하다고 판단
            }
            return false; //아님 말고
        },
        getReply:function(baseDir,room, msg) { //수신된 채팅에 대한 적당한 답변 반환
            var data = this.DB.readData(baseDir, room); //저장된 채팅들을 불러옴
            if (data != null && msg.length !== 0) { //저장된 채팅이 없거나, 10% 확률이 터진게 아니면, 작동 안함
                data = data.split("\n"); //냥
                var result = []; //비슷한 말들이 들어갈 배열
                for (var n = 0; n < data.length - 1; n++) { //적당하다 싶은 녀석들을
                    if (this.checkWord(data[n], msg)) result.push(data[n + 1]); //배열에 추가
                }
                if (result[0] != null) return result[Math.floor(Math.random() * result.length)]; //배열이 빈게 아니라면 아무거나 하나 반환
            }
            return null; //일치하는게 없거나, 저장된 채팅이 없거나, 발동할 확률(?)이 아니면, null 반환
        },
        say:function(msg, replier) { //그냥 말하는 함수
            replier.reply("[AI] " + msg); //앞에다가 이상한 문구 붙이는 용도
        },
        isValidData:function(msg) { //배울 만한 채팅인지 구분하는 함수
            var noStudy = ["/","\n"]; //엔터가 포함된건 학습 X. 비속어 필터링 등도 여기다가 넣으면 이상한 말은 안배움
            for (var n = 0; n < noStudy.length; n++) {
                if (msg.indexOf(noStudy[n]) != -1) return false;
            }
            return true;
        }
    },
    Chatprocess:function(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId, roomList, scriptName) {
        room = room.trim();
        /*상수 선언*/
        const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath(); //내장메모리 최상위 경로
        var BaseDir = sdcard+"/"+scriptName;
        this.DB.createDir(BaseDir)
        /*아래의 목록 roomList에 적힌 원하는 방 이름을 적으세요
        const roomList = ["DEBUG ROOM"]; */
        /*상수 (객체) 선언*/
        const preChat = {}; //도배 방지 구현용
        const lastSender = {}; //보낸 사람 구분용
        if (roomList.indexOf(room) != -1) {
            /*
             *(string) room
             *(string) sender
             *(boolean) isGroupChat
             *(function) replier.reply(message)
             *(function) replier.reply(room, message, hideErrorToast = false)
             *(function) imageDB.getProfileBase64()
             *(string) packageName
             */
            /*모르면 골롬*/
            msg = msg.trim();
            sender = sender.trim();
            /*도배 방지*/
            if (preChat[room] == msg) return; //동일한 채팅이 두 번 이상 연속으로 수신되면, 가볍게 무시
            preChat[room] = msg;
            /*반응 안할 채팅들*/
            var noReply = [".", "사진", "동영상", "음성메시지", "카카오톡 프로필", "(이모티콘)"];
            for (var n = 0; n < noReply.length; n++) {
                if (msg == noReply[n]) return;
            }
            /*적당한 채팅 하나 가져와서 답장(?)하는 부분*/
            var chat = this.Ai.getReply(BaseDir, room, msg);
            if (chat != null) this.Ai.say(chat, replier);
            /*채팅을 학습하는 부분*/
            if (this.Ai.isValidData(msg)) { //배울 만한 채팅인 경우,
                var data = this.DB.readData(BaseDir, room); //배운 채팅 목록을 가져옴
                if (data == null) { //아직 배운게 없다면
                    this.DB.saveData(BaseDir, room, msg); //새로 저장
                } else { //아니면,
                    if (lastSender[room] == sender) { //같은 사람이 연속으로 채팅을 한 경우,
                        this.DB.saveData(BaseDir, room, data + " " + msg); //같은 채팅으로 분류
                    } else { //아니면,
                        this.DB.saveData(BaseDir, room, data + "\n" + msg); //다른 채팅으로 분류
                    }
                }
            }
            lastSender[room] = sender;
        } else {
            return;
        }
    }
}