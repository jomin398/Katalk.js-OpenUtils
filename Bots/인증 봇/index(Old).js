const scriptName = "인증 봇";
var  CmdLocked={};
var Lock ="";
var 클립보드 = Api.getContext().getSystemService(Api.getContext().CLIPBOARD_SERVICE);
function getImageHash(ImageDB){
return java.lang.String(ImageDB.getProfileImage()).hashCode();
}
function login(room, msg, sender, isGroupChat, replier, ImageDB){
if(msg =="/인증키"){
CmdLocked={};
var Locknum = Math.floor(Math.random()*999999999);
Lock=Locknum;
replier.reply("인증키가 클립보드에 전달되었습니다.");
클립보드.setText(Locknum.toString())
java.lang.Thread.sleep(10000);
if(CmdLocked[room]== undefined|CmdLocked[room]!== false){
CmdLocked[room]=true;
Lock ="";
replier.reply("인증시간 초과됨.\n명령어 사용 : "+((CmdLocked[room])?"불가":"가능"));
}
}
if(msg.startsWith("/인증 ")&&msg.split(" ")[1]==Lock){
if(CmdLocked[room]== undefined|CmdLocked[room]==true){
CmdLocked[room]=false;
Lock ="";
replier.reply("인증됨");
java.lang.Thread.sleep(5000)
replier.reply("명령어 사용여부 : "+((CmdLocked[room])?"불가":"가능"))
Lock ="";
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