const scriptName = "unNamed";
importPackage(java.io);
const thisBotPath = "sdcard/katalkbot/Bots/"+scriptName;
const fs = FileStream;
const version = 1.0; 
const ini = {
    path:thisBotPath+"/mein.ini",
    tmpInid:[
        "[userData]",
        "#최종 사용자 약관 동의? (0 : 아니요 , 1 : 네)",
        "EULAtrue=",
        "#개인 봇 활성화를 위해 봇 주인의 실명이 필요합니다.",
        "#아래에 적어주셔야 되며, 이때 닉내임은 사용이 불가능합니다.",
        "userRName=",
        null
    ],
    initsay:[
        "봇 폴더 내부의 \""+thisBotPath+"/EULA.txt\" 을 읽고",
        ini.path+"을 열고 수정해주세요.",
    ]
};
function shutdown(res){
    Log.d("===== 5초후 시스탬이 종료됩니다. =====");
    for (i=5;i>0;i--){
        java.lang.Thread.sleep(1000);
        Log.d(i);
    };
    java.lang.Thread.sleep(1000);
    Log.e("시스탬을 종료했습니다.");
    throw res;
};

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {
    if(room == "DEBUG ROOM"){
        if( msg == "init" & sender== "DEBUG SENDER"){
            if(!new File(ini.path).exists()){
                replier.reply([
                    "Your Uniq Bot maker (ver " +version+")",
                    "안녕하세요",
                    null,
                    "봇 템플릿을 제작해주는 봇입니다",
                    "본인의 이름과 약관을 동의 헤주시면 됩니다.",
                    "스크립트의 로그를 확인해주세요."
                ].join("\n"));
                fs.write(ini.path,ini.tmpInid.join("\n"));
                java.lang.Thread.sleep(1000);
                Log.e(ini.initsay.join("\n"));
                shutdown(new IOException(ini.path));
            }else{
                replier.reply("스크립트의 로그를 확인해주세요.");
                Log.d("매인 설정 파일에서 설정을 읽어옵니다.");
                let d = fs.read(ini.path).map(x=>x.trim()).split("\n");
                let isEULAnot = Boolean(d[2]==ini.tmpInid[2]||d[2].replace(ini.tmpInid[2],"")==0);
                let isNamenotKo = Boolean(d[5]==ini.tmpInid[5]||!/^[가-힣]*$/gm.test(d[5].replace(ini.tmpInid[5],"")));
                java.lang.Thread.sleep(2000);
                if(isEULAnot || isNamenotKo){
                    Log.i("설정파일을 로드 했습니다.");
                    java.lang.Thread.sleep(1000);
                    Log.i("===== [매인 설정파일] =====\n\n"+d);
                    if(isEULAnot){
                        shutdown(new InternalError("최종 사용자 약관에 동의 해주세요."));
                    };
                    if(isNamenotKo){
                        shutdown(new InternalError([ini.tmpInid[3],ini.tmpInid[4]].join("\n")));
                    }
                };
                java.lang.Thread.sleep(1000);
                Log.i("프로그램 준비중");
                shutdown(new InternalError("프로그램이 빌드되지 않음"));
            };
        }
    }else{
        return;
    }
}
