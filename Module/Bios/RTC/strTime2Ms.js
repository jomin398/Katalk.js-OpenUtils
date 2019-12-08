function strTime2Ms(strTime) {
/*자연어에서 밀리초 구하기*/
var regex = /동안 ?만|만|까지$/gm;
strTime = strTime.replace(regex,"");
/*분/초 뒤에 ~동안만 ~만 ~까지 라는 접속사를 넣어도 인식하게해줌*/
var fullTreg = /(\d분 ?\d{1,2}초)/g;
var minTreg = /\d분/g;
var secRTreg = /\d초/g;
if (Tstr.match(fullTreg)) {
var min = parseInt(Tstr.split("분")[0]);
var sec = parseInt(Tstr.split("분")[1].split("초")[0].trim());
if (sec >= 60) {
return "입력받은 \"sec\"의 값은 60초를 초과해"
} else {
return (min * 60) * 1000 + sec * 1000
}
} else if (Tstr.match(minTreg)) {
var min = parseInt(Tstr.replace("분", ""));
return (min * 60) * 1000
} else if (Tstr.match(secTreg)) {
var sec = parseInt(Tstr.replace("초", ""));
return sec * 1000
} else {
return "입력받은 값은 알수가 없어", undefined;
}
}
/a =new Date()

/*사용법
* replier.reply(strTime2Ms("1분"))
* replier.reply(strTime2Ms("2분 42초"))
*/
