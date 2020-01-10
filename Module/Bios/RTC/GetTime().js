const scriptName = "GetTime().js";
function GetTime() {
// 현제시간 구하는 함수
var tday = new Date(); //오늘
//시간
var hh = String(tday.getHours());
var mm = String(tday.getMinutes());
var ss = String(tday.getSeconds());
//유통기한 날짜와 같은 방식
var YY = String(tday.getFullYear());
var MM = String(tday.getMonth()+1);
var DD = String(tday.getDate());
var day = String(tday.getDay());//요일
//편의를 위한 프리셋
var dnday = String(MM+"월"+DD+"일("+["일","월","화","수","목","금","토"][day]+")");

if (hh < 10) {
hh = '0' + String(hh)
}
if (mm < 10) {
mm = '0' + String(mm)
}
if (ss < 10) {
ss = '0' + String(ss)
}
return {
hh: hh,
mm: mm,
ss: ss,
YY: YY,
MM: MM,
DD:DD,
day:day,
dnday:dnday
};
/*사용법
전역함수(this)추가후
replier.reply(Gettime().dnday)
하시면
1월11일(토)
이런 식으로 반환됩니다.
프리셋은 맘대로 바꾸시고 호출하셔도되요
*/
}

/*코드 줄여주신뒤 재공유해주시면 감사하겠습니다. 
전 생각나는대로 코드를 적어가느라 상당히 깁니다.
*/
function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
    /*(이 내용은 길잡이일 뿐이니 지우셔도 무방합니다)
     *(String) room: 메시지를 받은 방 이름
     *(String) msg: 메시지 내용
     *(String) sender: 전송자 닉네임
     *(boolean) isGroupChat: 단체/오픈채팅 여부
     *replier: 응답용 객체. replier.reply("메시지") 또는 replier.reply("방이름","메시지")로 전송
     *(String) ImageDB.getProfileImage(): 전송자의 프로필 이미지를 Base64로 인코딩하여 반환
     *(String) packageName: 메시지를 받은 메신저의 패키지 이름. (카카오톡: com.kakao.talk, 페메: com.facebook.orca, 라인: jp.naver.line.android
     *(int) threadId: 현재 쓰레드의 순번(스크립트별로 따로 매김)     *Api,Utils객체에 대해서는 설정의 도움말 참조*/
  if (msg == "/실험1"){  
replier.reply(Gettime().dnday)
};
}

function onStartCompile(){
    /*컴파일 또는 Api.reload호출시, 컴파일 되기 이전에 호출되는 함수입니다.
     *제안하는 용도: 리로드시 자동 백업*/
    
}

//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState,activity) {
    var layout=new android.widget.LinearLayout(activity);
    layout.setOrientation(android.widget.LinearLayout.HORIZONTAL);
    var txt=new android.widget.TextView(activity);
    txt.setText("액티비티 사용 예시입니다.");
    layout.addView(txt);
    activity.setContentView(layout);
}
function onResume(activity) {}
function onPause(activity) {}
function onStop(activity) {}
